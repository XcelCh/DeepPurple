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
import com.example.fyp.entity.Recording;
import com.example.fyp.entity.Transcript;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.repo.TranscriptRepository;

@Service
public class RecordingListService {

    @Autowired
    private RecordingRepository recordingRepository;

    public List<Map<String, Object>> getRecordingList() {
        return recordingRepository.getAllRecordings();
    }

}
