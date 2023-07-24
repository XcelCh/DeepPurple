package com.example.fyp.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Analysis;

@Service
public interface AnalysisService {
    
    Analysis loadAnalysisById(Integer id) throws UsernameNotFoundException;


}
