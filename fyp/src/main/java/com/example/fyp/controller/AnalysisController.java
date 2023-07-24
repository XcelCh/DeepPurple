package com.example.fyp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.entity.Analysis;
import com.example.fyp.service.AnalysisServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/recording")
public class AnalysisController {

    @Autowired
    AnalysisServiceImpl analysisServiceImpl;

    @GetMapping("/Analysis")
    public ResponseEntity<?> analysis() {
        Analysis ra = new Analysis();
        ra = analysisServiceImpl.loadAnalysisById(1);
        return ResponseEntity.ok().body(ra);
    }
    
}
