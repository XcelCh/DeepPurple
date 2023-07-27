package com.example.demo.Entity;

import java.util.Comparator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
        this.startTime = Integer.parseInt(arr[0]);
        this.endTime = Integer.parseInt(arr[1]);
        
        if(arr[2].equals("SPEAKER_01"))
            this.speaker1 = true;
        else
            this.speaker1 = false;
        
    }

    @Override
    public int compare(Diarization a, Diarization b) {
        // Compare in ascending order
        return Double.compare(a.startTime, b.startTime);
    }

    @Override
    public String toString(){
        return String.format("%d - %d, %b", startTime, endTime, speaker1);
    }
}