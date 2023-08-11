package com.example.fyp.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.fyp.entity.Analysis;
import com.example.fyp.entity.Recording;
import com.example.fyp.entity.Transcript;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.repo.TranscriptRepository;

@Service
public class AnalysisService {
    @Autowired
    private AnalysisRepository analysisRepository;

    @Autowired
    private RecordingRepository recordingRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TranscriptRepository transcriptRepository;

    public ResponseEntity<?> getAnalysisByRecordingId(Integer recordingId) {
        Optional<Analysis> analysis = analysisRepository.findById(recordingId);
        Optional<Recording> recording = recordingRepository.findById(recordingId);
        List<Transcript> transcripts = transcriptRepository.findByRecordingId(recordingId);
        if(analysis.isPresent() && recording.isPresent()) {
            // String employeeName = employeeRepository.findEmployeeNameById(recording.get().getEmployeeId());
            String employeeName = employeeRepository.findEmployeeNameById(recording.get().getEmployee().getEmployeeId());
            
            for (Transcript transcript : transcripts) {
                if(transcript.getAnalysis().getRecording().getEmployee().getEmployeeId() != null) {
                    transcript.setEmployeeName(employeeName);
                } else {
                    transcript.setEmployeeName("Customer");
                }
            }

            HashMap<String, Object> hmap = new HashMap<String, Object>();
            hmap.put("analysis", analysis.get());
            hmap.put("recording", recording.get());
            hmap.put("employeeName", employeeName);
            hmap.put("transcripts", transcripts);
            return new ResponseEntity<HashMap<String, Object>>(hmap, HttpStatus.OK);
        } else{
            return ResponseEntity.notFound().build();
        }
    }

    public void updateDialogByTranscriptAndRecordingId(Integer transcriptId, Integer recordingId, String dialog) {
        Transcript transcript = transcriptRepository.findByTranscriptIdAndRecordingId(transcriptId, recordingId);
        transcript.setDialog(dialog);
        transcriptRepository.save(transcript);
    }

}