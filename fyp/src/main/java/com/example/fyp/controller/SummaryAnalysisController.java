package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.service.SummaryAnalysisService;

@RestController
@RequestMapping("/summaryAnalysis")
public class SummaryAnalysisController {
    
    private final SummaryAnalysisService summaryAnalysisService;

    @Autowired
    public SummaryAnalysisController(SummaryAnalysisService summaryAnalysisService){
        this.summaryAnalysisService = summaryAnalysisService;
    }

    @GetMapping("/getAnalysis")
    public ResponseEntity<?> getSummaryAnalysis() {
        return summaryAnalysisService.getSummaryAnalysis();
    }
    
    @GetMapping("/employeeSentiment/{employeeId}")
    public ResponseEntity<?> getEmployeeSentiment(@PathVariable Integer employeeId) {
        Object[] employeeSentiment = summaryAnalysisService.getEmployeeSentiment(employeeId);
        return ResponseEntity.ok(employeeSentiment);
    }

}
