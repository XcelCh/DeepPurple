package com.example.fyp.entity;

import java.util.Comparator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Create Diarization entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Diarization implements Comparator<Diarization>{
    private String word;
    private double startTime;
    private double endTime;
    private double confidence;
    private boolean speaker1;

    public Diarization(String[] arr){
        this.startTime = Double.parseDouble(arr[0]);
        this.endTime = Double.parseDouble(arr[1]);
        
        if(arr[2].equals("SPEAKER_00"))
            this.speaker1 = true;
        else
            this.speaker1 = false;
    }

    @Override
    public int compare(Diarization a, Diarization b) {
        // Compare in ascending order
        return Double.compare(a.endTime, b.endTime);
    }

    @Override
    public String toString(){
        return String.format("%.2f - %.2f, %b", startTime, endTime, speaker1);
    }
}
