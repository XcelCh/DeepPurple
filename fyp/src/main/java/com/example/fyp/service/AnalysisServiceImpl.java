package com.example.fyp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Analysis;
import com.example.fyp.repo.AnalysisRepository;

@Service
public class AnalysisServiceImpl implements AnalysisService {
    @Autowired
    private AnalysisRepository analysisRepository;

    @Override
    public Analysis loadAnalysisById(Integer id) throws UsernameNotFoundException {
        Analysis analysis = analysisRepository.findByRecordingId(id)
            .orElseThrow(() -> new UsernameNotFoundException("Recording not found"));

        return analysis;
    }
}
