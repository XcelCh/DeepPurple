package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DAO.AnalysisDAO;

@Service
public class AnalysisService {
    
    private final AnalysisDAO analysisDAO;
    
    @Autowired
    public AnalysisService(AnalysisDAO analysisDAO){
        this.analysisDAO = analysisDAO;
    }
}
