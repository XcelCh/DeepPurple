package com.example.fyp.model;

import java.util.Vector;

public class RecordingAnalysisAnswer {
    private String category;
    private String summary;
    private String customerSentiment;
    private String employeeSentiment;
    private String callSentiment;
    private Vector<DetailEmotion> emotions;  
    private String mainIssue;
    private String employeePerformance;
    private String negativeEmotions;

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

    public String getMainIssue() {
        return mainIssue;
    }

    public String getEmployeePerformance() {
        return employeePerformance;
    }

    public String getNegativeEmotions() {
        return negativeEmotions;
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

    public void setEmotions(Vector<DetailEmotion> emotions) {
        this.emotions = emotions;
    }

    public void setMainIssue(String mainIssue) {
        this.mainIssue = mainIssue;
    }

    public void setEmployeePerformance(String employeePerformance) {
        this.employeePerformance = employeePerformance;
    }

    public void setNegativeEmotions(String negativeEmotions) {
        this.negativeEmotions = negativeEmotions;
    }

}
