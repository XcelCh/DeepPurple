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

        // double avgDuration = recordingService.getAvgRecordingDurationByAccount(accountId);
        summaryAnalysisDto.setAverageCallDuration(recordingService.getAvgRecordingDurationByAccount(accountId));

        // int inquiryCount = analysisService.countCategoryById("Inquiry", accountId);
        // int complaintCount = analysisService.countCategoryById("Complaint", accountId);
        // int warrantyCount = analysisService.countCategoryById("Warranty", accountId);
        summaryAnalysisDto.setInquiry(analysisService.countCategoryById("Inquiry", accountId));
        summaryAnalysisDto.setComplaint(analysisService.countCategoryById("Complaint", accountId));
        summaryAnalysisDto.setWarranty(analysisService.countCategoryById("Warranty", accountId));

        // int positiveRecSentiment = analysisService.countRecSentiment("Positive", accountId);
        // int negativeRecSentiment = analysisService.countRecSentiment("Negative", accountId);
        summaryAnalysisDto.setPositiveRecSentiment(analysisService.countRecSentiment("Positive", accountId));
        summaryAnalysisDto.setNegativeRecSentiment(analysisService.countRecSentiment("Negative", accountId));

        // int positiveEmpSentiment = analysisService.countEmpSentiment("Positive", accountId);
        // int negativeEmpSentiment = analysisService.countEmpSentiment("Negative", accountId);
        

        

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

    // public ResponseEntity<?> getSummaryAnalysis() {
        // Integer recordingCount = getRecordingCount();
        // double avgDuration = getAverageRecordingDuration();
        // Integer countInquiry = countCategory("Inquiry");
        // Integer countComplaint = countCategory("Complaint");
        // Integer countWarranty = countCategory("Warranty");
        // Integer countPositiveSentiment = countSentiment("Positive");
        // Integer countNegativeSentiment = countSentiment("Negative");
        // List<Object[]> top5Positive = getTop5EmployeesByPositiveSentiment();
        // List<Object[]> top5Negative = getTop5EmployeesByNegativeSentiment();
        // List<Object[]> allEmployeeName = getAllEmployeeName();
        // Object[] employeeSentiment = getEmployeeSentiment((Integer) allEmployeeName.get(0)[0]);
        // List<Object[]> callsHandled = getCallsHandled();
        // List<List<Object>> mostMentionedWords = getMostMentionedWords();

        // HashMap<String, Object> hmap = new HashMap<String, Object>();
        // hmap.put("recordingCount", recordingCount);
        // hmap.put("averageCallDuration", avgDuration);
        // hmap.put("countInquiry", countInquiry);
        // hmap.put("countComplaint", countComplaint);
        // hmap.put("countWarranty", countWarranty);
        // hmap.put("countPositiveSentiment", countPositiveSentiment);
        // hmap.put("countNegativeSentiment", countNegativeSentiment);
        // hmap.put("top5Positive", top5Positive);
        // hmap.put("top5Negative", top5Negative);
        // hmap.put("allEmployeeName", allEmployeeName);
        // hmap.put("employeeSentiment", employeeSentiment);
        // hmap.put("callsHandled", callsHandled);
        // hmap.put("mostMentionedWords", mostMentionedWords);


        // return new ResponseEntity<HashMap<String, Object>>(hmap, HttpStatus.OK);
    // }

    // public double getAverageRecordingDuration() {
    //     return recordingRepository.getAverageRecordingDuration();
    // }

    // public Integer countCategory(String category) {
    //     return analysisRepository.countByCategory(category);
    // }

    // public Integer countSentiment(String recordingSentiment) {
    //     return analysisRepository.countByRecordingSentiment(recordingSentiment);
    // }

    // public List<Object[]> getTop5EmployeesByPositiveSentiment() {
    //     return employeeRepository.findTop5EmployeesByPositiveSentiment();
    // }

    // public List<Object[]> getTop5EmployeesByNegativeSentiment() {
    //     return employeeRepository.findTop5EmployeesByNegativeSentiment();
    // }

    // public List<Object[]> getAllEmployeeName() {
    //     return employeeRepository.findAllEmployeeName();
    // }

    // public Object[] getEmployeeSentiment(Integer employeeId) {
    //     return employeeRepository.findEmployeeSentimentById(employeeId);
    // }

    // public List<Object[]> getCallsHandled() {
    //     return recordingRepository.findCallsHandled();
    // }

    // public Integer getRecordingCount() {
    //     return recordingRepository.countRecordings();
    // }

    // public List<List<Object>> getMostMentionedWords() {
    //     List<String> sentimentTranscripts = transcriptRepository.getTranscripts();

    //     Map<String, Integer> wordFrequencyMap = new HashMap<>();

    //     for (String transcript : sentimentTranscripts) {
    //         String[] words = transcript.split("\\s+");
    //         for (String word : words) {
    //             // Ignore case and remove punctuation
    //             word = word.toLowerCase().replaceAll("[^a-zA-Z0-9]", "");
    //             wordFrequencyMap.put(word, wordFrequencyMap.getOrDefault(word, 0) + 1);
    //         }
    //     }

    //     List<Map.Entry<String, Integer>> sortedWordFrequencyList = new ArrayList<>(wordFrequencyMap.entrySet());
    //     sortedWordFrequencyList.sort((a, b) -> b.getValue().compareTo(a.getValue()));
    //     // for (int i = 0; i < sortedWordFrequencyList.size(); i++) {
    //     //     System.out.println(sortedWordFrequencyList.get(i));
    //     // }

    //     List<List<Object>> topWordsWithFrequency = new ArrayList<>();
    //     for (int i = 0; i < Math.min(5, sortedWordFrequencyList.size()); i++) {
    //         Map.Entry<String, Integer> entry = sortedWordFrequencyList.get(i);
    //         List<Object> wordFrequencyPair = new ArrayList<>();
    //         wordFrequencyPair.add(entry.getKey());
    //         wordFrequencyPair.add(entry.getValue());
    //         topWordsWithFrequency.add(wordFrequencyPair);
    //     }

    //     return topWordsWithFrequency;
    // }

}
