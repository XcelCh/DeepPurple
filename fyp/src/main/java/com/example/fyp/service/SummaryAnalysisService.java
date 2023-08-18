package com.example.fyp.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.fyp.controller.dto.EmployeeAnalysisDto;
import com.example.fyp.controller.dto.SummaryAnalysisDto;
import com.example.fyp.model.PerformanceComparator;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.repo.TranscriptRepository;

//Service class for Analyses summary
@Service
public class SummaryAnalysisService {

    @Autowired
    private RecordingService recordingService;

    @Autowired
    private AnalysisService analysisService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private TranscriptRepository transcriptRepository;

    //Get analyses' Summary
    public SummaryAnalysisDto getSummaryAnalysis(Integer accountId) {

        SummaryAnalysisDto summaryAnalysisDto = new SummaryAnalysisDto();

        summaryAnalysisDto.setAverageCallDuration(recordingService.getAvgRecordingDurationByAccount(accountId));

        summaryAnalysisDto.setInquiry(analysisService.countCategoryById("Inquiry", accountId));
        summaryAnalysisDto.setComplaint(analysisService.countCategoryById("Complaint", accountId));
        summaryAnalysisDto.setWarranty(analysisService.countCategoryById("Warranty", accountId));

        summaryAnalysisDto.setPositiveRecSentiment(analysisService.countRecSentiment("Positive", accountId));
        summaryAnalysisDto.setNegativeRecSentiment(analysisService.countRecSentiment("Negative", accountId));
        

        List<EmployeeAnalysisDto> employeeList = new ArrayList<>();
        List<Object []> result = employeeService.getEmployeeByAccountId(accountId);

        for (int x = 0 ; x < result.size(); x++) {

            EmployeeAnalysisDto employeeAnalysisDto = new EmployeeAnalysisDto();
            employeeAnalysisDto.setEmployeeId((int)result.get(x)[0]);
            employeeAnalysisDto.setEmployeeName((String) result.get(x)[1]);
            employeeAnalysisDto.setNumberOfCalls((int) result.get(x)[2]);

            employeeAnalysisDto.setEmployeeAvgPerformance(recordingService.getAvgPerformanceByEmployee(employeeAnalysisDto.getEmployeeId()));
            employeeAnalysisDto.setTotalDuration(recordingService.getTotalDurationByEmployee(employeeAnalysisDto.getEmployeeId()));
            employeeAnalysisDto.setPositiveEmpSentiment(analysisService.countEmpSentiment("Positive", employeeAnalysisDto.getEmployeeId()));
            employeeAnalysisDto.setNegativeEmpSentiment(analysisService.countEmpSentiment("Negative", employeeAnalysisDto.getEmployeeId()));
            employeeList.add(employeeAnalysisDto);
        }

        Collections.sort(employeeList, new PerformanceComparator());

        summaryAnalysisDto.setEmployeeList(employeeList);

        


        return summaryAnalysisDto;
    }    

}
