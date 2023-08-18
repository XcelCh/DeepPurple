package com.example.fyp.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Analysis;
import com.example.fyp.entity.Recording;

// Analysis Repository for Analysis Entity to access to the Database
@Repository
public interface AnalysisRepository extends JpaRepository<Analysis, Integer> {

    @Query("SELECT COUNT(a) FROM Analysis a WHERE a.category = :category AND a.recording.account.accountId = :accountId")
    Integer countByCategory(@Param("category") String category, @Param("accountId") Integer accountId);

    @Query("SELECT COUNT(a) FROM Analysis a WHERE a.recordingSentiment = :recordingSentiment AND a.recording.account.accountId = :accountId")
    Integer countByRecordingSentiment(@Param("recordingSentiment") String recordingSentiment, @Param("accountId") Integer accountId);

    @Query("SELECT COUNT(a) FROM Analysis a JOIN a.recording r WHERE a.employeeSentiment = :employeeSentiment AND a.recording.employee.employeeId = :employeeId")
    Integer countByEmployeeSentiment(@Param("employeeSentiment") String employeeSentiment, @Param("employeeId") Integer employeeId);

    @Query("SELECT a.analysisId FROM Analysis a WHERE a.recording.recordingId = :recordingId")
    Integer getAnalysisId(@Param("recordingId") Integer recordingId);
    
    Optional<Analysis> findById(Integer analysisId);
}