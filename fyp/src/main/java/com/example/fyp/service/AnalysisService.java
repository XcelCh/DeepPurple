package com.example.fyp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Analysis;
import com.example.fyp.entity.Recording;
import com.example.fyp.entity.Transcript;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.repo.TranscriptRepository;
import com.example.fyp.utils.Container;

// Service class for communicating between Database to process Analysis entity
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

    // Get analysis object by recording ID
    public ResponseEntity<?> getAnalysisByRecordingId(Integer recordingId) {
        Optional<Analysis> analysis = analysisRepository.findById(recordingId);
        Optional<Recording> recording = recordingRepository.findById(recordingId);
        List<Transcript> transcripts = transcriptRepository.findByRecordingId(recordingId);
        if (analysis.isPresent() && recording.isPresent()) {
            // String employeeName = employeeRepository.findEmployeeNameById(recording.get().getEmployeeId());
            String employeeName = employeeRepository
                    .findEmployeeNameById(recording.get().getEmployee().getEmployeeId());

            for (Transcript transcript : transcripts) {
                if (transcript.getAnalysis().getRecording().getEmployee().getEmployeeId() != null) {
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
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get Analysis ID
    public Integer getAnalysisId(Integer recordingId) {
        Integer analysisId = analysisRepository.getAnalysisId(recordingId);
        System.out.println("ANALYSIS ID: " + analysisId);
        return analysisId;
    }

    // Update dialog using transcript
    public void updateDialogByTranscriptAndRecordingId(Integer transcriptId, Integer recordingId, String dialog) {
        Transcript transcript = transcriptRepository.findByTranscriptIdAndRecordingId(transcriptId, recordingId);
        transcript.setDialog(dialog);
        transcriptRepository.save(transcript);
    }
    
    // Process and save analysis
    public Analysis processAnalysis(Recording rec, Container c){
        Analysis analysis = new Analysis();
        analysis.setEmployeeSpeakTime(c.getData()[1]);
        analysis.setCustomerSpeakTime(c.getData()[2]);
        analysis.setSilentTime(c.getData()[4]);
        analysis.setTranscriptConfidence(c.getData()[0] / c.getData()[3]);
        analysis.setRecording(rec);

        return analysisRepository.save(analysis);
    }


    // Find analysis using analysis ID
    public Analysis findAnalysisById(Integer id) {

        Analysis analysis = analysisRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + id));

        return analysis;
    }

    // Get the sentiment score for the Analysis
    public double getScore(String employeePerformance, String skill) {

        int index = employeePerformance.toLowerCase().indexOf(skill);

        String score = "";

        if (employeePerformance.length() >= index+skill.length()+2) {

            score = employeePerformance.substring(index+skill.length(), index+skill.length()+2);
        }
        else {
            score = employeePerformance.substring(index+skill.length(), index+skill.length()+1);
        }

        if (!score.matches("^\\d{2}$")) {

            score = score.substring(0, 1);
        } 
        else if (score.equals("10")) {

            if (employeePerformance.substring(index+skill.length()+2, index+skill.length()+3).equals("0")) {
                score = "100";
            }
        }

        return Double.parseDouble(score);
    }

    // Save analysis
    public void saveAnalysis(Analysis analysis) {
        analysisRepository.save(analysis);
    }

    // Count how many analyses instance of a category
    public Integer countCategoryById(String category, Integer accountId) {
        return analysisRepository.countByCategory(category, accountId);
    }

    // Count how many analyses instance of a sentiment
    public Integer countRecSentiment(String sentiment, Integer accountId) {
        return analysisRepository.countByRecordingSentiment(sentiment, accountId);
    }

    // Count based on employee's sentiment
    public Integer countEmpSentiment(String sentiment, Integer employeeId) {
        return analysisRepository.countByEmployeeSentiment(sentiment, employeeId);
    }
}