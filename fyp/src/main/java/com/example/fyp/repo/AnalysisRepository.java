package com.example.fyp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Analysis;

@Repository
public interface AnalysisRepository extends JpaRepository<Analysis, Integer> {

    @Query("SELECT COUNT(a) FROM Analysis a WHERE a.category = :category")
    Integer countByCategory(@Param("category") String category);

    @Query("SELECT COUNT(a) FROM Analysis a WHERE a.recordingSentiment = :recordingSentiment")
    Integer countByRecordingSentiment(@Param("recordingSentiment") String recordingSentiment);

    @Query("SELECT a.analysisId FROM Analysis a WHERE a.recording.recordingId = :recordingId")
    Integer getAnalysisId(@Param("recordingId") Integer recordingId);
    
}