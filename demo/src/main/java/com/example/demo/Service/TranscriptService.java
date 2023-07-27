package com.example.demo.Service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DAO.TranscriptDAO;
import com.example.demo.Entity.Diarization;
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

@Service
public class TranscriptService{
    private final TranscriptDAO transcriptDAO;

    @Autowired
    public TranscriptService(TranscriptDAO transcriptDAO){
        this.transcriptDAO = transcriptDAO;
    }

    public List<SpeechRecognitionResult> transcribeSpeech(byte[] bytes) throws FileNotFoundException, IOException{
        System.out.println("Inside transcript service");

        // Instantiates a client
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream("deeppurple-391609-4c6969e0e424.json"));

        SpeechClient speechClient = SpeechClient.create(SpeechSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build());

        // Reads the audio file into memory
        // byte[] audioBytes = Files.readAllBytes(Paths.get(audioFilePath));
        ByteString audioData = ByteString.copyFrom(bytes);

        // Builds the recognition config
        RecognitionConfig config = RecognitionConfig.newBuilder()
                .setEncoding(AudioEncoding.LINEAR16)
                .setSampleRateHertz(8000)
                //.setUseEnhanced(true)
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

    public void processTranscription(List<List<SpeechRecognitionResult>> transcriptions, List<Diarization> diarizations){
        Iterator<Diarization> iterDia = diarizations.iterator();    // For every speakers timings

        Diarization currSpeaker = iterDia.next();
        Diarization prevSpeaker = currSpeaker;
        for (List<SpeechRecognitionResult> results : transcriptions){  // For every file transcriptions
            for (SpeechRecognitionResult result : results){    // For every transcription results
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);

                Iterator<WordInfo> iterWord = alternative.getWordsList().iterator();    // For every words in a transcription result

                if(prevSpeaker.equals(currSpeaker) || (currSpeaker.isSpeaker1() != prevSpeaker.isSpeaker1()))
                    if(currSpeaker.isSpeaker1())
                        System.out.print("\nSpeaker 1 (Left): ");
                    else
                        System.out.print("\nSpeaker 2 (Right): ");

                while(iterWord.hasNext()){
                    WordInfo wordInfo = iterWord.next();

                    String word = wordInfo.getWord();
                    int startTime = (int) (wordInfo.getStartTime().getSeconds());
                    int endTime = (int) (wordInfo.getEndTime().getSeconds());
                    double confidence = wordInfo.getConfidence();

                    // System.out.println("Word: " + word);
                    // System.out.printf("Transcription starTime: %d%n", startTime);
                    // System.out.printf("Diarization starTime: %d%n", currSpeaker.getStartTime());
                    // System.out.printf("Transcription endTime: %d%n", endTime);
                    // System.out.printf("Diarization endTime: %d%n", currSpeaker.getEndTime());

                    if(startTime >= currSpeaker.getStartTime() && endTime <= currSpeaker.getEndTime()){
                        //System.out.println("Inside the if");
                        System.out.print(word + " ");
                    } else {
                        //System.out.println("Inside the else");
                        if(iterDia.hasNext()){
                            //System.out.println("Inside the if inside the else");
                            prevSpeaker = currSpeaker;
                            currSpeaker = iterDia.next();

                            if((currSpeaker.isSpeaker1() != prevSpeaker.isSpeaker1()))
                                if(currSpeaker.isSpeaker1())
                                    System.out.print("\nSpeaker 1 (Left): " + word + " ");
                                else
                                    System.out.print("\nSpeaker 2 (Right): " + word + " ");
                        }
                    }
                }
            }
        }
    }    
}