package com.example.fyp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Transcript;

@Repository
public interface TranscriptRepository extends JpaRepository<Transcript, Integer> {
    List<Transcript> findByRecordingId(Integer recordingId);

    Transcript findByTranscriptIdAndRecordingId(Integer transcriptId, Integer recordingId);

    @Query("SELECT t.dialog " +
        "FROM Transcript t " +
        "JOIN Analysis a ON t.recordingId = a.recordingId ")
    List<String> getTranscripts();

    @Query("SELECT t.employeeId, t.dialog FROM Transcript t WHERE t.recordingId = :recordingId")
    List<Object[]> findEmployeeAndDialogByRecordingId(Integer recordingId);
}
