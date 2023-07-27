package com.example.fyp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Transcript;

@Repository
public interface TranscriptRepository extends JpaRepository<Transcript, Integer> {
    List<Transcript> findByRecordingId(Integer recordingId);

    Transcript findByTranscriptIdAndRecordingId(Integer transcriptId, Integer recordingId);
}
