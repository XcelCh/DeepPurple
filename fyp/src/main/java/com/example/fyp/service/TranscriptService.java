package com.example.fyp.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Queue;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.example.fyp.repo.TranscriptRepository;
import com.example.fyp.entity.Analysis;
import com.example.fyp.entity.Diarization;
import com.example.fyp.entity.Transcript;
import com.example.fyp.utils.Container;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.cloud.speech.v1.SpeechSettings;
import com.google.cloud.speech.v1.WordInfo;
import com.google.protobuf.ByteString;

// Service class for Transcript entity
@Service
public class TranscriptService{
    private final TranscriptRepository transcriptRepository;

    public TranscriptService(TranscriptRepository transcriptRepository){
        this.transcriptRepository = transcriptRepository;
    }

    // Error when the speech client throws an error and the speech client does not call the shutdown command
    // The error only occurs when the function executed next time
    public List<SpeechRecognitionResult> transcribeSpeech(byte[] bytes) throws FileNotFoundException, IOException{
        System.out.println("Inside transcript service");

        // Instantiates a client
        GoogleCredentials credentials = GoogleCredentials.fromStream(new ClassPathResource("deeppurple-391609-4c6969e0e424.json").getInputStream());

        SpeechClient speechClient = SpeechClient.create(SpeechSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build());

        // Reads the audio file into memoryO
        // byte[] audioBytes = Files.readAllBytes(Paths.get(audioFilePath));
        ByteString audioData = ByteString.copyFrom(bytes);

        // Builds the recognition config
        RecognitionConfig config = RecognitionConfig.newBuilder()
                .setEncoding(AudioEncoding.LINEAR16)
                .setSampleRateHertz(8000)
                .setUseEnhanced(true)
                .setEnableWordTimeOffsets(true)
                .setEnableWordConfidence(true)
                .setModel("phone_call")
                .setLanguageCode("en-US")
                .build();

        // Builds the recognition audio
        RecognitionAudio audio = RecognitionAudio.newBuilder()
                .setContent(audioData)
                .build();

        RecognizeResponse response = speechClient.recognize(config, audio);

        speechClient.shutdown();

        // // Speaker Tags are only included in the last result object, which has only one alternative.
        // SpeechRecognitionAlternative alternative =
        //     response.getResults(response.getResultsCount() - 1).getAlternatives(0);

        // // The alternative is made up of WordInfo objects that contain the speaker_tag.
        // WordInfo wordInfo = alternative.getWords(0);
        // int currentSpeakerTag = wordInfo.getSpeakerTag();

        // For each word, get all the words associated with one speaker, once the speaker changes,
        // add a new line with the new speaker and their spoken words.
        // StringBuilder speakerWords =
        //     new StringBuilder(
        //         String.format("Speaker %d: %s", wordInfo.getSpeakerTag(), wordInfo.getWord()));

        // for (int i = 1; i < alternative.getWordsCount(); i++) {
        //     wordInfo = alternative.getWords(i);
        //     if (currentSpeakerTag == wordInfo.getSpeakerTag()) {
        //         speakerWords.append(" ");
        //         speakerWords.append(wordInfo.getWord());
        //     } else {
        //         speakerWords.append(
        //             String.format("\nSpeaker %d: %s", wordInfo.getSpeakerTag(), wordInfo.getWord()));
        //         currentSpeakerTag = wordInfo.getSpeakerTag();
        //     }
        // }

        //System.out.println(speakerWords.toString());

        //System.out.println("\nFinish one transcription");

        return response.getResultsList();
    }

    //Transcribe speech into text result
    public List<SpeechRecognitionResult> transcribeSpeechEnhanced(byte[] bytes) throws FileNotFoundException, IOException{
        System.out.println("Inside transcript service");

        // Instantiates a client
        GoogleCredentials credentials = GoogleCredentials.fromStream(new ClassPathResource("deeppurple-391609-4c6969e0e424.json").getInputStream());

        SpeechClient speechClient = SpeechClient.create(SpeechSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build());

        // Reads the audio file into memoryO
        // byte[] audioBytes = Files.readAllBytes(Paths.get(audioFilePath));
        ByteString audioData = ByteString.copyFrom(bytes);

        // Builds the recognition config
        RecognitionConfig config = RecognitionConfig.newBuilder()
                .setEncoding(AudioEncoding.LINEAR16)
                .setSampleRateHertz(8000)
                .setUseEnhanced(true)
                .setEnableWordTimeOffsets(true)
                .setEnableWordConfidence(true)
                .setModel("phone_call")
                .setLanguageCode("en-US")
                .build();

        // Builds the recognition audio
        RecognitionAudio audio = RecognitionAudio.newBuilder()
                .setContent(audioData)
                .build();

        RecognizeResponse response = speechClient.recognize(config, audio);

        speechClient.shutdown();

        return response.getResultsList();
    }

    //Process generated transcript
    public Container processTranscription(Queue<Diarization> orderedDiarization, double offset, Container c){
        double endTime = 0.0 + offset;
        double tempEndTime = endTime;
        String dialog = "";
        boolean flag = true;

        while(!orderedDiarization.isEmpty()) {
            boolean speaker1 = orderedDiarization.peek().isSpeaker1();
            double startTime = orderedDiarization.peek().getStartTime() + offset;

            if(startTime - tempEndTime >= 0){
                c.getData()[4] += startTime - tempEndTime;
                System.out.println(c.getData()[4]);
                flag = true;
            } else
                flag = false;
            
            while (!orderedDiarization.isEmpty() && orderedDiarization.peek().isSpeaker1() == speaker1){
                endTime = orderedDiarization.peek().getEndTime() + offset;

                c.getData()[0] += orderedDiarization.peek().getConfidence();
                c.getData()[3] += 1;

                dialog += orderedDiarization.poll().getWord() + " ";
            }
            
            if(speaker1 == true){
                c.getData()[1] += endTime - startTime;
                c.getTranscriptions().add(new Transcript(null, startTime, endTime, null, dialog, true, null));
            } else {
                c.getData()[2] += endTime - startTime;
                c.getTranscriptions().add(new Transcript(null, startTime, endTime, null, dialog, false, null));
            }

            if(flag)
                tempEndTime = endTime;
            
            dialog = "";
        }

        c.getData()[5] = endTime;

        return c;
    }

    //Overloaded process transcription
    public Container processTranscription(List<List<SpeechRecognitionResult>> results, Queue<Diarization> diarizations, List<Double> offsets){
        double[] data = new double[5]; // 0 = confidence, 1 = employee speak time, 2 = customer speak time, 3 = counter, 4 = silence time
        List<Transcript> transcriptions = new ArrayList<>();

        data[4] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();

        for(int i = 0; i < results.size(); i++){ 
            for (SpeechRecognitionResult result : results.get(i)){    // For every transcription results
                System.out.println("Inside the second loop");
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);

                Iterator<WordInfo> iterWord = alternative.getWordsList().iterator();    // For every words in a transcription result

                String dialog = "";
                boolean startTimeFlag = true;
                double startTime = 0.0;
                double endTime = 0.0;
                while(iterWord.hasNext()){
                    data[3] += 1;
                    WordInfo wordInfo = iterWord.next();

                    String word = wordInfo.getWord();
                    endTime = wordInfo.getEndTime().getSeconds() + wordInfo.getEndTime().getNanos() / 1e9;
                    data[0] += wordInfo.getConfidence();

                    if(startTimeFlag){
                        startTime = wordInfo.getStartTime().getSeconds() + wordInfo.getStartTime().getNanos() / 1e9;
                    }

                    // System.out.println("Word: " + word);
                    // System.out.println("Dialog: " + dialog);
                    // System.out.printf("Transcription starTime: %d%n", startTime);
                    // System.out.printf("Diarization starTime: %d%n", currSpeaker.getStartTime());
                    // System.out.printf("Transcription endTime: %d%n", endTime);
                    // System.out.printf("Diarization endTime: %d%n", currSpeaker.getEndTime());

                    if(endTime <= diarizations.peek().getEndTime()){
                        //System.out.println("Inside the if");
                        dialog += word + " ";
                        startTimeFlag = false;
                    } else {

                        if(dialog.isBlank()){
                            System.out.println("Something actually blank: " + dialog + "the left side should be empty if it is blank");
                            diarizations.poll();
                            data[4] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();
                            continue;
                        }

                        //System.out.println("Inside the else");
                        if(diarizations.peek().isSpeaker1()){
                            data[1] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();

                            if(i == 0)
                                transcriptions.add(new Transcript(null, startTime, endTime, null, dialog, true, null));
                            else
                                transcriptions.add(new Transcript(null, startTime + offsets.get(i - 1), endTime + offsets.get(i - 1), null, dialog, true, null));

                        } else {
                            data[2] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();

                            if(i == 0)
                                transcriptions.add(new Transcript(null, startTime, endTime, null, dialog, false, null));
                            else
                                transcriptions.add(new Transcript(null, startTime + offsets.get(i - 1), endTime + offsets.get(i - 1), null, dialog, false, null));
                        }
    
                        diarizations.poll();
                        dialog = "";
                        data[4] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();
                        System.out.println("Inner: " + data[4]);
                    }
                }

                if(!dialog.isBlank()){
                    if(diarizations.peek().isSpeaker1()){
                        data[1] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();
                        if(i == 0)
                            transcriptions.add(new Transcript(null, startTime, endTime, null, dialog, true, null));
                        else
                            transcriptions.add(new Transcript(null, startTime + offsets.get(i - 1), endTime + offsets.get(i - 1), null, dialog, true, null));

                    } else {
                        data[2] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();

                        if(i == 0)
                            transcriptions.add(new Transcript(null, startTime, endTime, null, dialog, false, null));
                        else
                            transcriptions.add(new Transcript(null, startTime + offsets.get(i - 1), endTime + offsets.get(i - 1), null, dialog, false, null));
                    }

                    diarizations.poll();
                    dialog = "";
                    data[4] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();
                    System.out.println("Outside: " + data[4]);
                }
            }
        }

        while(!diarizations.isEmpty()){
            System.out.println(diarizations.peek());

            if(diarizations.peek().isSpeaker1())
                data[1] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();
            else
                data[2] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();
            
            data[4] += diarizations.peek().getEndTime() - diarizations.peek().getStartTime();

            diarizations.poll();
        }

        return new Container(transcriptions, data);
    }

    // Save transcripts.
    public void persistTranscriptions(Analysis analysis, Container c){
        for (Transcript t: c.getTranscriptions()) {
            t.setAnalysis(analysis);
            transcriptRepository.save(t);
        }
    }
}
