package com.example.fyp.model;
import java.util.*;

public class TextSentimentAnswer {
    private String overallContent;
    private String overallSentiment;
    private Vector<DetailEmotion> emotions;    
    private String output;


    public String getOverallContent() {
        return overallContent;
    }

    public void setOverallContent(String overallContent) {
        this.overallContent = overallContent;
    }

    public String getOverallSentiment() {
        return overallSentiment;
    }

    public void setOverallSentiment(String overallSentiment) {
        this.overallSentiment = overallSentiment;
    }

    public Vector<DetailEmotion> getEmotions() {
        return emotions;
    }

    public void setEmotions(Vector<DetailEmotion> emotions) {
        this.emotions = new Vector<DetailEmotion>(emotions);
    }
    
     public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }
}
