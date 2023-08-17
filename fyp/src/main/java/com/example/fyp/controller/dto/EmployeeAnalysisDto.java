package com.example.fyp.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class EmployeeAnalysisDto {
    
    @JsonIgnore
    private int employeeId;
    private String employeeName;
    private double employeeAvgPerformance;
    private int numberOfCalls;
    private double totalDuration;
    private int positiveEmpSentiment;
    private int negativeEmpSentiment;


}
