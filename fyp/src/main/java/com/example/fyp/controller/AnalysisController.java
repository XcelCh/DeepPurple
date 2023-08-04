package com.example.fyp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import com.example.fyp.controller.dto.ChangeTranscriptDto;
import com.example.fyp.entity.Account;
import com.example.fyp.entity.Analysis;
import com.example.fyp.service.AnalysisService;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.repo.RecordingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    @Autowired
    public AnalysisController(AnalysisService analysisService){
        this.analysisService = analysisService;
    }

    @GetMapping("/{recordingId}")
    public ResponseEntity<?> getAnalysisByRecordingId(@PathVariable Integer recordingId) {
        return analysisService.getAnalysisByRecordingId(recordingId);
    }

    @PostMapping("/editTranscript")
    public ResponseEntity<String> saveEdit(@RequestBody ChangeTranscriptDto changeTranscriptDto) {
        analysisService.updateDialogByTranscriptAndRecordingId(changeTranscriptDto.getTranscriptId(), changeTranscriptDto.getRecordingId(), changeTranscriptDto.getNewTranscript());
        return ResponseEntity.ok("Password Change Successful.");
    }
    
}