package com.example.fyp.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Queue;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
import javax.sound.sampled.spi.AudioFileWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.example.fyp.entity.Account;
import com.example.fyp.entity.Analysis;
import com.example.fyp.entity.Diarization;
import com.example.fyp.entity.Recording;
import com.example.fyp.entity.Usages;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.utils.Container;
import com.google.cloud.speech.v1.SpeechRecognitionResult;

// Service Class for Recording Entity handles communication to the database and handles related functions
@Service
public class RecordingService extends AudioFileWriter{

    private final RecordingRepository recordingRepository;
    private final TranscriptService transcriptService;
    private final AnalysisService analysisService;
    private final DiarizationService diarizationService;
    private final AmazonS3 s3Client;

    @Autowired
    PriceService priceService;

    @Autowired
    UsageService usageService;

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Value("${application.bucket.name}")
	private String bucketName;

    public RecordingService(RecordingRepository recordingRepository, TranscriptService transcriptService, DiarizationService diarizationService, 
                            AnalysisService analysisService, AmazonS3 s3Client){
        this.recordingRepository = recordingRepository;
        this.transcriptService = transcriptService;
        this.diarizationService = diarizationService;
        this.analysisService = analysisService;
        this.s3Client = s3Client;
    }

    // public Recording getRecordingById(int id){
    //     Recording recording = recordingDAO.findById(id).get();

    //     byte[] bytes = decompress(recording.getContent());
              
    //     System.out.println("After decompress" + bytes.length);

    //     return recording;
    // }

    // public ResponseEntity<String> getAllRecordingById(List<Integer> ids){
    //     List<Recording> recordings = (List<Recording>) (recordingDAO.findAllById(ids));

    //     for (Recording recording : recordings)
    //         System.out.println(decompress(recording.getContent()).length);

    //     return ResponseEntity.ok("OK");
    // }

    // Check if limit of the user is enough to analyze the recording uploaded
    public boolean checkLimit (List<Integer> ids, Float limitLeft, Account account) throws UnsupportedAudioFileException, IOException, Exception {


        double price = priceService.getPrice(1);

        System.out.println("Now fetching");
        List<Recording> recordings = (List<Recording>) (recordingRepository.findAllById(ids));
        System.out.println("Finish fetching");

        double totalDuration = 0;

        // For loop the recording uploaded to be analyze
        for (Recording recording : recordings) {

            System.out.println("Inside recording");
            recording.setTempFilePath(readFromS3ObjectToFile(recording.getTimeStamp()+"_"+recording.getRecordingName(), recording.getRecordingUrl()));

            AudioInputStream audio = AudioSystem.getAudioInputStream(recording.getTempFilePath());
            recording.setBytes(audio.readAllBytes());
            recording.setFormat(audio.getFormat());
            recording.setSampleRate((int) (recording.getFormat().getSampleRate()));
            recording.setAudioFormat(recording.getRecordingName().split("\\.")[1]);
            recording.setRecordingDuration((double) (audio.getFrameLength() / recording.getFormat().getFrameRate()));

            // Add total duration
            totalDuration += recording.getRecordingDuration();

            audio.close();
        }

        // If price of analyzing uploads larger than limit left return false
        double charge = (totalDuration/60) * price;
        if (charge > limitLeft ) {

            return false;
        }

        // If limit left is sufficient, call the analyze function to analyze the recordings
        return analyze(recordings, totalDuration, price, account);
    }

    public boolean analyze(List<Recording> recordings, double totalDuration, double price, Account account) throws UnsupportedAudioFileException, IOException, Exception{

        double intervalSeconds = 0.25;
        double amplitudeThreshold = 0.01;
        for (Recording recording : recordings){
            Container c = new Container(new double[6]);

            AudioInputStream audio = AudioSystem.getAudioInputStream(recording.getTempFilePath());
            
            System.out.println(recording.displayFormat());

            convertToLinearPCM(recording);

            System.out.println(recording.displayFormat());

            double len = recording.getRecordingDuration();
            System.out.println("Recording len: " + len);

            if(recording.getRecordingDuration() >= 60.0){
                List<Double> splits = calculateSplitWithAmp(intervalSeconds, amplitudeThreshold, recording);
            
                double prev = 0.0;                
                for (int i = 0; i < splits.size(); i++) {
                    //System.out.printf("Curr len: %.2f%n", len);
                    len -= splits.get(i) - prev;
                    prev = splits.get(i);
                    System.out.printf("Split timing: %.2f%n", splits.get(i));
                }

                if(len <= 60)
                    System.out.printf("Remaining length: %.3f%n" +
                                    "Successfully found the splitting intervals%n%n", len);
                else
                    System.out.println("Failed finding all the split interval\n");

                byte[][] splittedAudioBytes = splitAudio(splits, recording);
                System.out.println("Successfully split the audio file\n");

                if(recording.getFormat().getChannels() == 2){   // Stereo
                    byte[][][] leftRightSplit; //First layer indicate the splits, second layer indicate left or right, third layer is the bytes value
                    leftRightSplit = splitStereoUniqueSpeakerPerChannel(splittedAudioBytes);   
                    
                    System.out.println("Left right split completed successfully!");
                    Queue<Diarization> orderedDiarization;

                    // Need to update
                    // Index 0 means left and index 1 means right
                    for (int j = 0; j < leftRightSplit.length; j++) {
                        orderedDiarization = diarizationService.diarizeNonML(transcriptService.transcribeSpeech(leftRightSplit[j][0]), transcriptService.transcribeSpeech(leftRightSplit[j][1]));
                        
                        if(j == 0)
                            c = transcriptService.processTranscription(orderedDiarization, 0, c);
                        else
                            c = transcriptService.processTranscription(orderedDiarization, splits.get(j - 1), c);

                        System.out.println("Finish processed one split");
                    }
                    c.getData()[4] += recording.getRecordingDuration() - c.getData()[5];
                
                } else {
                    List<List<SpeechRecognitionResult>> transcriptions = new ArrayList<>();
                    Queue<Diarization> diarizations = diarizationService.diarizeML(recording.getTempFilePath().getCanonicalPath());
                    
                    for (byte[] bytes : splittedAudioBytes)
                        transcriptions.add(transcriptService.transcribeSpeech(bytes));

                    c = transcriptService.processTranscription(transcriptions, diarizations, splits);

                    c.getData()[4] = recording.getRecordingDuration() - c.getData()[4];
                }
            } else {
                byte[][] audioBytes = new byte[][] {recording.getBytes()};
                System.out.printf("Successfully read the audio file bytes%n" +
                                  "Total number of bytes: %d%n", audioBytes[0].length);

                if(recording.getFormat().getChannels() == 2){
                    byte[][][] leftRightSplit;// First layer indicate the new file, second layer indicate left or right, third layer is the bytes value
                    leftRightSplit = splitStereoUniqueSpeakerPerChannel(audioBytes);
                    
                    System.out.println("Left right split completed successfully!");

                    c = new Container(null, new double[6]);
                    Queue<Diarization> orderedDiarization;
                    orderedDiarization = diarizationService.diarizeNonML(transcriptService.transcribeSpeech(leftRightSplit[0][0]), transcriptService.transcribeSpeech(leftRightSplit[0][1]));
                    
                    c = transcriptService.processTranscription(orderedDiarization, 0, c);
                    
                    c.getData()[4] += recording.getRecordingDuration() - c.getData()[5];

                // Need to be copied (mono < 60 secs)
                } else {
                    List<List<SpeechRecognitionResult>> transcriptions = new ArrayList<>();
                    Queue<Diarization> diarizations = diarizationService.diarizeML(recording.getTempFilePath().getCanonicalPath());
                    
                    transcriptions.add(transcriptService.transcribeSpeech(audioBytes[0]));

                    c = transcriptService.processTranscription(transcriptions, diarizations, new ArrayList<Double>());

                    c.getData()[4] = recording.getRecordingDuration() - c.getData()[4];
                }
            }
            Analysis analysis = analysisService.processAnalysis(recording, c);
            recording.setAnalysis(analysis);
            recordingRepository.save(recording);
            transcriptService.persistTranscriptions(analysis, c);

            audio.close();

        }

        // Save record of Usages object into the database after analyzing 
        Usages usage = new Usages(null, (totalDuration/60), price, new Date(System.currentTimeMillis()), null, account);
        account.addUsage(usage);
        accountServiceImpl.saveAccount(account);
        
        System.out.println("Finish analyzing");

        return true;
    }

    private File readFromS3ObjectToFile(String fileName, String filePath) {    
    	S3Object s3Object = s3Client.getObject(bucketName, fileName);
    	InputStream inputStream = s3Object.getObjectContent(); 	
    	try {
    		File tmp = File.createTempFile(fileName, ".wav");
    		Files.copy(inputStream, tmp.toPath(), StandardCopyOption.REPLACE_EXISTING);
            return tmp;
    	}catch(IOException e) {
    		e.printStackTrace();
            return null;
    	}
    }

    private void convertToLinearPCM(Recording recording) throws UnsupportedAudioFileException, IOException{
        // Specify the desired output format (linear PCM)
        AudioFormat pcmFormat = new AudioFormat(
                AudioFormat.Encoding.PCM_SIGNED,
                8000.0f,
                16,
                recording.getFormat().getChannels(),
                recording.getFormat().getChannels() * 2,
                8000.0f,
                false);

        AudioInputStream audioInputStream = new AudioInputStream(
            new ByteArrayInputStream(recording.getBytes()),
            recording.getFormat(),
            recording.getBytes().length / recording.getFormat().getFrameSize());

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        // Convert the audio stream to the new format
        AudioInputStream convertedStream = AudioSystem.getAudioInputStream(pcmFormat, audioInputStream);
        write(convertedStream, AudioFileFormat.Type.WAVE, out);

        recording.setFormat(pcmFormat);

        recording.setBytes(out.toByteArray());

        // System.out.println("Before read:" + bytes.length);
        // bytes = new byte[convertedStream.available()];
        // convertedStream.read(bytes);
        // System.out.println("After read:" + bytes.length);
        
        // length = (double) (audioInputStream.getFrameLength() / format.getFrameRate());
        // System.out.println("Length" + length);

        // Close the streams
        audioInputStream.close();
    }

    private List<Double> calculateSplitWithAmp(double interval, double threshold, Recording recording) throws UnsupportedAudioFileException, IOException{
        int numChannels = recording.getFormat().getChannels();

        int bytesPerSample = recording.getFormat().getSampleSizeInBits() / 8;
        float sampleRate = recording.getFormat().getSampleRate();

        int samplesPerInterval = (int) (sampleRate * interval);
        int numIntervals = (int) Math.ceil((double) recording.getBytes().length / (bytesPerSample * numChannels) / samplesPerInterval);

        // Maximum number of splits (audio length / 60.0) * 2 - 1
        List<Double> splitTimes = new ArrayList<>();

        int sampleIndex = 0;
        int counter = 0;
        double tolerance = 0.0000001;
        double maxTime = 0.0;
        double splitTime = 60.0 - interval;
        double audioLength = recording.getRecordingDuration();
        for (int i = 0; i < numIntervals; i++) {
            double intervalAmplitude = 0.0;

            for (int j = 0; j < samplesPerInterval; j++) {
                if (sampleIndex < recording.getBytes().length / (bytesPerSample * numChannels)) {
                    int sample = 0;
                    for (int channel = 0; channel < numChannels; channel++) {
                        int sampleValue = 0;
                        for (int b = 0; b < bytesPerSample; b++) {
                            int v = recording.getBytes()[sampleIndex * (bytesPerSample * numChannels) + b + channel * bytesPerSample];
                            sampleValue += v << (b * 8);
                        }
                        sample += sampleValue;
                    }
                    intervalAmplitude += Math.abs(sample / (numChannels * Math.pow(2, recording.getFormat().getSampleSizeInBits() - 1)));
                    sampleIndex++;
                }
            }

            //System.out.printf("%.2f - %.2f, %.5f%n", i * interval, (i + 1) * interval, intervalAmplitude / samplesPerInterval);

            if(intervalAmplitude / samplesPerInterval <= threshold){
                splitTime = i * interval;
                counter++;
                //System.out.printf("Split time under threshold: %.2f%n", splitTime);
            }

            //System.out.println(i * interval);
            if(Math.abs((i * interval) - (maxTime + 60.0 - interval)) < tolerance){
                if(counter == 0){
                    splitTime = i * interval;
                    //System.out.println("First " + splitTime);
                    splitTimes.add(splitTime);
                } else {
                    //System.out.println(maxTime);
                    splitTimes.add(splitTime);
                    //System.out.println("Second " + splitTime);
                    //System.out.println(splitTime - maxTime);

                    counter = 0;
                }

                audioLength -= (splitTime - maxTime);
                //System.out.println("Value: " + (splitTime - maxTime));
                //System.out.println("total length left after split: " + audioLength);

                maxTime += (splitTime - maxTime);
                //System.out.println("Max time: " + maxTime);
            }

            if(audioLength < 60.0){
                splitTimes.add(recording.getRecordingDuration());
                break;
            }    
        }

        if(audioLength > 60)
            splitTimes.add(splitTime);
        
        return splitTimes;
    }

    public byte[][] splitAudio(List<Double> intervals, Recording recording) throws IOException{
        // AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(new File(filepath));
        // System.out.println(audioInputStream.getFrameLength());
        long totalFrames = (int) ((recording.getBytes().length / recording.getFormat().getFrameSize()));
        System.out.println(totalFrames);

        double frameRate = recording.getFormat().getFrameRate();

        // // Create a directory to store the split audio files
        // File outputDir = new File("splittingOutput");
        // outputDir.mkdir();

        byte[][] splittedBytes = new byte[intervals.size()][];

        long startFrame = 0;
        for(int i = 0; i < intervals.size(); i++){
            // System.out.println("Start frame: " + startFrame / frameRate);
            // Calculate the interval duration in frames
            long intervalFrames = (long) ((intervals.get(i) - (startFrame / frameRate)) * frameRate);

            // Calculate the start and end frames for each interval
            long endFrame = Math.min(startFrame + intervalFrames, totalFrames);
            // System.out.println("End frame: " + endFrame / frameRate);

            // Create a new audio input stream with the specified frame length
            AudioInputStream intervalAudioInputStream = new AudioInputStream(
                new ByteArrayInputStream(recording.getBytes(), (int)(recording.getFormat().getFrameSize() * startFrame), (int)(recording.getFormat().getFrameSize() * (endFrame - startFrame))),
                recording.getFormat(),
                endFrame - startFrame);

            splittedBytes[i] = intervalAudioInputStream.readAllBytes();
            System.out.println("Bytes read length: " + splittedBytes[i].length);

            // // Write the interval audio data to a new file
            // File outputFile = new File(outputDir, "interval_" + (endFrame / frameRate) + ".wav");
            // AudioSystem.write(intervalAudioInputStream, AudioFileFormat.Type.WAVE, outputFile);

            startFrame += intervalFrames;

            // System.out.println("interval_" + (endFrame / frameRate) + ".wav: ");
            // getAudioInfo("splittingOutput/interval_" + (endFrame / frameRate) + ".wav");
        }

        //audioInputStream.close();

        return splittedBytes;
    }

    private byte[][][] splitStereoUniqueSpeakerPerChannel(byte[][] splittedAudioBytes) throws IOException{
        // // Calculate the number of samples per channel
        // int bytesPerSample = inputFormat.getSampleSizeInBits() / 8;
        // int samplesPerChannel = bytesRead / (2 * bytesPerSample);

        byte[][][] leftRightBytes = new byte[splittedAudioBytes.length][2][];
        int bytesPerSample = 2;

        for (int i = 0; i < splittedAudioBytes.length; i++) {
            int splitBytesLen = splittedAudioBytes[i].length;
            int samplesPerChannel = splitBytesLen / (2 * bytesPerSample);

            // Separate the left and right channels
            leftRightBytes[i][0] = new byte[samplesPerChannel * bytesPerSample];
            leftRightBytes[i][1] = new byte[samplesPerChannel * bytesPerSample];

            for (int j = 0, k = 0; j < splitBytesLen; j += 2 * bytesPerSample, k += bytesPerSample) {
            // Copy the left channel data
            System.arraycopy(splittedAudioBytes[i], j, leftRightBytes[i][0], k, bytesPerSample);

            // Copy the right channel data
            System.arraycopy(splittedAudioBytes[i], j + bytesPerSample, leftRightBytes[i][1], k, bytesPerSample);
            }

            // Save the left channel to a file
            // File outputLeftFile = new File("Left_" + i + ".wav");
            leftRightBytes[i][0] = convertToMono(leftRightBytes[i][0]);

            // Save the right channel to a file
            // File outputRightFile = new File("Right_" + i + ".wav");
            leftRightBytes[i][1] = convertToMono(leftRightBytes[i][1]);
        }

        return leftRightBytes;
    }

    private byte[] convertToMono(byte[] audioData) throws IOException{
        AudioFormat format = new AudioFormat(
                8000,
                16,
                1, // Mono
                true, // Signed
                false // Little endian
        );

        AudioInputStream audioInputStream = new AudioInputStream(
                new ByteArrayInputStream(audioData),
                format,
                audioData.length / format.getFrameSize()
        );

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        // Write the audio data to the ByteArrayOutputStream
        write(audioInputStream, AudioFileFormat.Type.WAVE, outputStream);

        // Get the byte array from the ByteArrayOutputStream
        byte[] convertedAudioData = outputStream.toByteArray();

        // Close the streams
        audioInputStream.close();
        outputStream.close();

        return convertedAudioData;
    }

    @Override
    public AudioFileFormat.Type[] getAudioFileTypes() {
        // Return the audio file types supported by your custom writer
        return new AudioFileFormat.Type[]{AudioFileFormat.Type.WAVE};
    }

    @Override
    public AudioFileFormat.Type[] getAudioFileTypes(AudioInputStream stream) {
        return getAudioFileTypes();
    }

    @Override
    public int write(AudioInputStream stream, AudioFileFormat.Type fileType, OutputStream out) throws IOException {
        // Create a buffer to read the audio data
        byte[] buffer = new byte[4096];
        int bytesRead;
        int totalBytesWritten = 0;

        // Read audio data from the AudioInputStream and write it directly to the output stream (without headers/metadata)
        while ((bytesRead = stream.read(buffer)) != -1) {
            out.write(buffer, 0, bytesRead);
            totalBytesWritten += bytesRead;
        }

        return totalBytesWritten;
    }

    @Override
    public int write(AudioInputStream stream, AudioFileFormat.Type fileType, File out) throws IOException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'write'");
    }

    public double getAvgRecordingDurationByAccount (Integer accountId) {
        return recordingRepository.getAverageRecordingDurationByAccount(accountId);
    }

    public double getAvgPerformanceByEmployee (Integer employeeId) {

        Double avg= recordingRepository.findAvgPeformanceByEmployeeId(employeeId);

        if (avg == null) {
            avg = (double)0;
        }

        return avg;
    }

    public double getTotalDurationByEmployee (Integer employeeId) {

        Double total = recordingRepository.findTotalDurationByEmployeeId(employeeId);

        if(total == null) {
            total = (double)0;
        }

        return total;
    }

    // public int getTotalRecordingByEmployee (Integer employeeId) {

    //     Integer total = recordingRepository.findTotalRecordingByEmployeeId(employeeId);

    //     if(total == null) {
    //         total = 0;
    //     }

    //     return total;
    // }
}