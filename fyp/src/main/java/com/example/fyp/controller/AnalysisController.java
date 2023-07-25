package com.example.fyp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import com.example.fyp.entity.Analysis;
import com.example.fyp.repo.AnalysisRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/analysis")
public class AnalysisController {

    @Autowired
    private AnalysisRepository analysisRepository;


    @GetMapping("/{recordingId}")
    public ResponseEntity<?> getAnalysisByRecordingId(@PathVariable Integer recordingId) {
        Optional<Analysis> analysis = analysisRepository.findById(recordingId);
        
        if(analysis.isPresent()) {
            return ResponseEntity.ok(analysis.get());
        } else{
            return ResponseEntity.notFound().build();
        }
    }
    
}
