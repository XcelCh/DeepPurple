package com.example.fyp.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Analysis;

@Repository
public interface AnalysisRepository extends JpaRepository<Analysis, Integer> {

    Optional<Analysis> findByRecordingId(Integer recordingId);
    
}