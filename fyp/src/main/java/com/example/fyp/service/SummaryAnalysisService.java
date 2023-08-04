package com.example.fyp.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Employee;
import com.example.fyp.entity.Transcript;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.repo.TranscriptRepository;

@Service
public class SummaryAnalysisService {

    @Autowired
    private RecordingRepository recordingRepository;

    @Autowired
    private AnalysisRepository analysisRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TranscriptRepository transcriptRepository;

    public ResponseEntity<?> getSummaryAnalysis() {
        Integer recordingCount = getRecordingCount();
        double avgDuration = getAverageRecordingDuration();
        Integer countInquiry = countCategory("Inquiry");
        Integer countComplaint = countCategory("Complaint");
        Integer countWarranty = countCategory("Warranty");
        Integer countPositiveSentiment = countSentiment("Positive");
        Integer countNegativeSentiment = countSentiment("Negative");
        List<Object[]> top5Positive = getTop5EmployeesByPositiveSentiment();
        List<Object[]> top5Negative = getTop5EmployeesByNegativeSentiment();
        List<Object[]> allEmployeeName = getAllEmployeeName();
        Object[] employeeSentiment = getEmployeeSentiment((Integer) allEmployeeName.get(0)[0]);
        List<Object[]> callsHandled = getCallsHandled();
        List<List<Object>> mostMentionedWords = getMostMentionedWords();

        HashMap<String, Object> hmap = new HashMap<String, Object>();
        hmap.put("recordingCount", recordingCount);
        hmap.put("averageCallDuration", avgDuration);
        hmap.put("countInquiry", countInquiry);
        hmap.put("countComplaint", countComplaint);
        hmap.put("countWarranty", countWarranty);
        hmap.put("countPositiveSentiment", countPositiveSentiment);
        hmap.put("countNegativeSentiment", countNegativeSentiment);
        hmap.put("top5Positive", top5Positive);
        hmap.put("top5Negative", top5Negative);
        hmap.put("allEmployeeName", allEmployeeName);
        hmap.put("employeeSentiment", employeeSentiment);
        hmap.put("callsHandled", callsHandled);
        hmap.put("mostMentionedWords", mostMentionedWords);
        return new ResponseEntity<HashMap<String, Object>>(hmap, HttpStatus.OK);
    }

    public double getAverageRecordingDuration() {
        return recordingRepository.getAverageRecordingDuration();
    }

    public Integer countCategory(String category) {
        return analysisRepository.countByCategory(category);
    }

    public Integer countSentiment(String recordingSentiment) {
        return analysisRepository.countByRecordingSentiment(recordingSentiment);
    }

    public List<Object[]> getTop5EmployeesByPositiveSentiment() {
        return employeeRepository.findTop5EmployeesByPositiveSentiment();
    }

    public List<Object[]> getTop5EmployeesByNegativeSentiment() {
        return employeeRepository.findTop5EmployeesByNegativeSentiment();
    }

    public List<Object[]> getAllEmployeeName() {
        return employeeRepository.findAllEmployeeName();
    }

    public Object[] getEmployeeSentiment(Integer employeeId) {
        return employeeRepository.findEmployeeSentimentById(employeeId);
    }

    public List<Object[]> getCallsHandled() {
        return recordingRepository.findCallsHandled();
    }

    public Integer getRecordingCount() {
        return recordingRepository.countRecordings();
    }

    public List<List<Object>> getMostMentionedWords() {
        List<String> sentimentTranscripts = transcriptRepository.getTranscripts();

        Map<String, Integer> wordFrequencyMap = new HashMap<>();

        for (String transcript : sentimentTranscripts) {
            String[] words = transcript.split("\\s+");
            for (String word : words) {
                // Ignore case and remove punctuation
                word = word.toLowerCase().replaceAll("[^a-zA-Z0-9]", "");
                wordFrequencyMap.put(word, wordFrequencyMap.getOrDefault(word, 0) + 1);
            }
        }

        List<Map.Entry<String, Integer>> sortedWordFrequencyList = new ArrayList<>(wordFrequencyMap.entrySet());
        sortedWordFrequencyList.sort((a, b) -> b.getValue().compareTo(a.getValue()));
        // for (int i = 0; i < sortedWordFrequencyList.size(); i++) {
        //     System.out.println(sortedWordFrequencyList.get(i));
        // }

        List<List<Object>> topWordsWithFrequency = new ArrayList<>();
        for (int i = 0; i < Math.min(5, sortedWordFrequencyList.size()); i++) {
            Map.Entry<String, Integer> entry = sortedWordFrequencyList.get(i);
            List<Object> wordFrequencyPair = new ArrayList<>();
            wordFrequencyPair.add(entry.getKey());
            wordFrequencyPair.add(entry.getValue());
            topWordsWithFrequency.add(wordFrequencyPair);
        }

        return topWordsWithFrequency;
    }

}
