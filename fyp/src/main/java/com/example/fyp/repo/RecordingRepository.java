package com.example.fyp.repo;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Recording;

@Repository
public interface RecordingRepository extends JpaRepository<Recording, Integer>{
    @Query("SELECT AVG(r.recordingDuration) FROM Recording r")
    Double getAverageRecordingDuration();

    @Query("SELECT e.employeeName, AVG(r.recordingDuration), COUNT(*) " +
       "FROM Recording r " +
       "JOIN Analysis a ON r.recordingId = a.recordingId " +
       "JOIN Employee e ON r.employeeId = e.employeeId " +
       "GROUP BY e.employeeId, e.employeeName " +
       "ORDER BY COUNT(*) DESC")
    List<Object[]> findCallsHandled();

    @Query("SELECT COUNT(r) FROM Recording r")
    Integer countRecordings();

    @Query("SELECT r.recordingId AS recordingId, r.recordingName AS recordingName, r.uploadDate AS uploadDate, " +
        "r.recordingDate AS dateRecorded, e.employeeName AS employeeName, r.accountId AS account_id, " +
        "a.category AS category, a.recordingSentiment AS sentiment, a.employeeSentiment AS employeeSentiment, a.customerSentiment AS customerSentiment " +
        "FROM Recording r " +
        "JOIN Employee e on r.employeeId = e.employeeId " +
        "JOIN Analysis a on a.recordingId = r.recordingId " + 
        "WHERE r.accountId = :account_id"
    )
    List<Map<String, Object>> getAllRecordings(Integer account_id);

    @Query("SELECT r.recordingId AS recordingId, r.uploadDate AS uploadDate "+
    "FROM Recording r WHERE r.recordingId = :recording_id")
    Map<String, Object> getRecordingById(Integer recording_id);
}
