package com.example.fyp.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.fyp.repo.RecordingRepository;

@Service
public class RecordingListService {

    @Autowired
    private RecordingRepository recordingRepository;

    public List<Map<String, Object>> getRecordingList(Integer account_id) {
        return recordingRepository.getAllRecordings(account_id);
    }

    public Map<String, Object> getRecordingById(Integer rec_id){
        return recordingRepository.getRecordingById(rec_id);
    }
    

}
