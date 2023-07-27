package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Recording;
import com.example.demo.Service.RecordingService;

@RequestMapping("controller/recording")
@RestController
public class RecordingController {
    private final RecordingService recordingService;

    @Autowired
    public RecordingController(RecordingService recordingService){
        this.recordingService = recordingService;
    }
    
    // Get the company details by
    // ID
    @GetMapping("/{id}")
    public Recording getRecordingById(@PathVariable(value = "id") int id){
        return recordingService.getRecordingById(id);
    }

    @PostMapping("getAllRecording")
    public ResponseEntity<String> getAllRecordingById(@RequestBody List<Integer> ids){
        return recordingService.getAllRecordingById(ids);
    }

    @PostMapping("analyze")
    public ResponseEntity<String> analyze(@RequestBody List<Integer> ids){
        try {
            return recordingService.analyze(ids);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ok("Error");
        }
    }

    
}