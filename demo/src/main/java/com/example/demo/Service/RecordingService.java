package com.example.demo.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.Inflater;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
import javax.sound.sampled.spi.AudioFileWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.DAO.RecordingDAO;
import com.example.demo.Entity.Recording;

@Service
public class RecordingService extends AudioFileWriter{
    private final RecordingDAO recordingDAO;
    private final TranscriptService transcriptService;
    private final DiarizationService diarizationService;

    @Autowired
    public RecordingService(RecordingDAO recordingDAO, TranscriptService transcriptService, DiarizationService diarizationService){
        this.recordingDAO = recordingDAO;
        this.transcriptService = transcriptService;
        this.diarizationService = diarizationService;
    }

    public Recording getRecordingById(int id){
        Recording recording = recordingDAO.findById(id).get();

        byte[] bytes = decompress(recording.getContent());
              
        System.out.println("After decompress" + bytes.length);

        return recording;
    }

    public ResponseEntity<String> getAllRecordingById(List<Integer> ids){
        List<Recording> recordings = (List<Recording>) (recordingDAO.findAllById(ids));

        for (Recording recording : recordings)
            System.out.println(decompress(recording.getContent()).length);

        return ResponseEntity.ok("OK");
    }

    public ResponseEntity<String> analyze(List<Integer> ids) throws UnsupportedAudioFileException, IOException{
        System.out.println("Before select");
        List<Recording> recordings = (List<Recording>) (recordingDAO.findAllById(ids));
        System.out.println("After select");

        double intervalSeconds = 0.25;
        double amplitudeThreshold = 0.01;
        for (Recording recording : recordings){
            recording.setContent(decompress(recording.getContent()));
            
            // Hard coded format as placeholder for now
            AudioFormat pcmFormat = new AudioFormat(
                AudioFormat.Encoding.PCM_SIGNED,
                8000.0f,
                16,
                2,
                4,
                8000.0f,
                false);

            recording.setFormat(pcmFormat);
            convertToLinearPCM(recording);

            recording.setRecordingDuration((double) ((int) ((recording.getContent().length / recording.getFormat().getFrameSize())) / recording.getFormat().getFrameRate()));
            double len = recording.getRecordingDuration();

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
                    byte[][][] leftRightSplit; //First layer indicate the new file, second layer indicate left or right, third layer is the bytes value
                    leftRightSplit = splitStereoUniqueSpeakerPerChannel(splittedAudioBytes);   
                    
                    System.out.println("Left right split completed successfully!");

                    // Index 0 means left and index 1 means right
                    for (byte[][] leftRightBytes : leftRightSplit) {
                        diarizationService.diarizeNonML(transcriptService.transcribeSpeech(leftRightBytes[0]), transcriptService.transcribeSpeech(leftRightBytes[1]));
                        System.out.println("Finish processed one split");
                    }
                }
            }
        }
        return ResponseEntity.ok("OK");
    }

    private byte[] decompress(byte[] data){
        Inflater inflater = new Inflater();
        inflater.setInput(data);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        try {
            inflater.inflate(tmp, 0, 44);

            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }

            outputStream.close();
        } catch (Exception ignored) {}

        return outputStream.toByteArray();
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
            new ByteArrayInputStream(recording.getContent()),
            recording.getFormat(),
            recording.getContent().length / recording.getFormat().getFrameSize());

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        // Convert the audio stream to the new format
        AudioInputStream convertedStream = AudioSystem.getAudioInputStream(pcmFormat, audioInputStream);
        write(convertedStream, AudioFileFormat.Type.WAVE, out);

        recording.setContent(out.toByteArray());

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
        int numIntervals = (int) Math.ceil((double) recording.getContent().length / (bytesPerSample * numChannels) / samplesPerInterval);

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
                if (sampleIndex < recording.getContent().length / (bytesPerSample * numChannels)) {
                    int sample = 0;
                    for (int channel = 0; channel < numChannels; channel++) {
                        int sampleValue = 0;
                        for (int b = 0; b < bytesPerSample; b++) {
                            int v = recording.getContent()[sampleIndex * (bytesPerSample * numChannels) + b + channel * bytesPerSample];
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
        long totalFrames = (int) ((recording.getContent().length / recording.getFormat().getFrameSize()));
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
                new ByteArrayInputStream(recording.getContent(), (int)(recording.getFormat().getFrameSize() * startFrame), (int)(recording.getFormat().getFrameSize() * (endFrame - startFrame))),
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
}
