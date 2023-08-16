package com.example.fyp.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.fyp.repo.RecordingRepository;

// Service Class for Recording Entity 
@Service
public class RecordingListService {

    @Autowired
    private RecordingRepository recordingRepository;

    // Get List of Recording associated with the accountId
    public List<Map<String, Object>> getRecordingList(Integer account_id) {
        return recordingRepository.getAllRecordings(account_id);
    }

    // Get Recording object by its ID
    public Map<String, Object> getRecordingById(Integer rec_id){
        return recordingRepository.getRecordingById(rec_id);
    }
}
