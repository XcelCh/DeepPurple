package com.example.fyp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Transcript;

// Transcript Repository for Transcript Entity to access to the Database
@Repository
public interface TranscriptRepository extends JpaRepository<Transcript, Integer> {

    @Query("SELECT t FROM Transcript t WHERE t.analysis.recording.recordingId = :recordingId")
    List<Transcript> findByRecordingId(Integer recordingId);

    @Query("SELECT t FROM Transcript t WHERE t.transcriptId = :transcriptId AND t.analysis.recording.recordingId = :recordingId")
    Transcript findByTranscriptIdAndRecordingId(Integer transcriptId, Integer recordingId);

    @Query("SELECT t.dialog FROM Transcript t")
    List<String> getTranscripts();

    @Query("SELECT t.speaker, t.dialog FROM Transcript t WHERE t.analysis.analysisId = :analysisId")
    List<Object[]> findEmployeeAndDialogByAnalysisId(Integer analysisId);
}
