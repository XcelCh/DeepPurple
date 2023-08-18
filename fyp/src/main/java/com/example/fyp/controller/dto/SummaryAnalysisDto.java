package com.example.fyp.controller.dto;

import java.util.List;

import lombok.Data;

@Data
public class SummaryAnalysisDto {
    

    private double averageCallDuration;
    private int inquiry;
    private int complaint;
    private int warranty;
    private int positiveRecSentiment;
    private int negativeRecSentiment;
    // private int positiveEmpSentiment;
    // private int negativeEmpSentiment;
    private List<EmployeeAnalysisDto> employeeList;
    private int recordingTotal;

}
