package com.example.fyp.repo;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Recording;

// Recording Repository for Recording Entity to access to the Database
@Repository
public interface RecordingRepository extends JpaRepository<Recording, Integer>{

    @Query("SELECT AVG(r.recordingDuration) FROM Recording r")
    Double getAverageRecordingDuration();

    @Query("SELECT r.employee.employeeName, AVG(r.recordingDuration), COUNT(*) FROM Recording r GROUP BY r.employee.employeeId, r.employee.employeeName ORDER BY COUNT(*) DESC")
    List<Object[]> findCallsHandled();

    @Query("SELECT COUNT(r) FROM Recording r")
    Integer countRecordings();

    @Query("SELECT r.recordingId AS recordingId, r.recordingName AS recordingName, r.uploadDate AS uploadDate, " +
            "r.recordingDate AS dateRecorded, r.employee.employeeName AS employeeName, r.employee.employeeId AS employeeId, r.account.accountId AS account_id, " +
            "r.analysis.category AS category, r.analysis.recordingSentiment AS sentiment, " +
            "r.analysis.employeeSentiment AS employeeSentiment, r.analysis.customerSentiment AS customerSentiment " +
            "FROM Recording r " +
            "LEFT JOIN r.analysis a " +
            "LEFT JOIN r.employee e " +
            "WHERE r.account.accountId = :account_id")
    List<Map<String, Object>> getAllRecordings(Integer account_id);

    @Query("SELECT r.recordingId AS recordingId, r.uploadDate AS uploadDate FROM Recording r WHERE r.recordingId = :recording_id")
    Map<String, Object> getRecordingById(Integer recording_id);        
    
    Optional<Recording> findByRecordingName(String fileName);    

    List<Recording> findByEmployee_EmployeeId(Integer employeeId);
    
}
