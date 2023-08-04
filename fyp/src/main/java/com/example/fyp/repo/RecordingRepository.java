package com.example.fyp.repo;

import java.util.List;

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

}
