package com.example.fyp.model;

import java.util.Vector;

public class RecordingAnalysisAnswer {
    private String category;
    private String summary;
    private String customerSentiment;
    private String employeeSentiment;
    private String callSentiment;
    private Vector<DetailEmotion> emotions;  

    public String getCategory() {
        return category;
    }

    public String getSummary() {
        return summary;
    }

    public String getCustomerSentiment() {
        return customerSentiment;
    }

    public String getEmployeeSentiment() {
        return employeeSentiment;
    }

    public String getCallSentiment() {
        return callSentiment;
    }

    public Vector<DetailEmotion> getEmotions() {
        return emotions;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public void setCustomerSentiment(String customerSentiment) {
        this.customerSentiment = customerSentiment;
    }

    public void setEmployeeSentiment(String employeeSentiment) {
        this.employeeSentiment = employeeSentiment;
    }

    public void setCallSentiment(String callSentiment) {
        this.callSentiment = callSentiment;
    }

    public void getEmotions(Vector<DetailEmotion> emotions) {
        this.emotions = emotions;
    }

}
