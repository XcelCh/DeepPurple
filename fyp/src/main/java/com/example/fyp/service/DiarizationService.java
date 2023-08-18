package com.example.fyp.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;

import org.springframework.stereotype.Service;

import com.example.fyp.entity.Diarization;
import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.cloud.speech.v1.WordInfo;

//Service to handle Diarization communication between database and backend
@Service
public class DiarizationService {

    public Queue<Diarization> diarizeNonML(List<SpeechRecognitionResult> monoLeft, List<SpeechRecognitionResult> monoRight){
        Queue<Diarization> orderedDiarization = new PriorityQueue<>(new Diarization());

        for(SpeechRecognitionResult result: monoLeft){
            SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);

            for (WordInfo wordInfo : alternative.getWordsList()){
                String word = wordInfo.getWord();
                double startTime = wordInfo.getStartTime().getSeconds() + wordInfo.getStartTime().getNanos() / 1e9;
                double endTime = wordInfo.getEndTime().getSeconds() + wordInfo.getEndTime().getNanos() / 1e9;
                double confidence = wordInfo.getConfidence();

                orderedDiarization.add(new Diarization(word, startTime, endTime, confidence, true));
            }
        }

        for(SpeechRecognitionResult result: monoRight){
            SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);

            for (WordInfo wordInfo : alternative.getWordsList()){
                String word = wordInfo.getWord();
                double startTime = wordInfo.getStartTime().getSeconds() + wordInfo.getStartTime().getNanos() / 1e9;
                double endTime = wordInfo.getEndTime().getSeconds() + wordInfo.getEndTime().getNanos() / 1e9;
                double confidence = wordInfo.getConfidence();

                orderedDiarization.add(new Diarization(word, startTime, endTime, confidence, false));
            }
        }

        return orderedDiarization;
    }

    public Queue<Diarization> diarizeML(String audioFilePath) throws Exception{
        // Start the process
        Process process = new ProcessBuilder("python", "speakerDiarization.py").start();

        // Get the input and output streams of the process
        InputStream inputStream = process.getInputStream();
        OutputStream outputStream = process.getOutputStream();

        // Create readers and writers for reading/writing to the process
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
        PrintWriter writer = new PrintWriter(outputStream, true, StandardCharsets.UTF_8);

        // Pass the function name and parameter to the Python script
        writer.println("speakerDiarization");
        writer.println(audioFilePath);
        writer.println("END_OF_INPUT"); // Mark the end of input

        Queue<Diarization> diarizations = new PriorityQueue<>(new Diarization());

        String line;
        while ((line = reader.readLine()) != null){
            if(line.contains(":"))
                diarizations.add(new Diarization(line.split(":")));
        }
        
        // Wait for the process to finish
        int exitCode = process.waitFor();
        System.out.println("Python script execution completed with exit code: " + exitCode);

        reader.close();
        writer.close();

        System.out.println("\nMachine learning diarization result");
        for (Diarization diarization : diarizations)
            System.out.println(diarization);
        
        return diarizations;
    }
}

