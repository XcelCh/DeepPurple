package com.example.fyp.controller;

import java.util.List;
import java.util.Optional;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.controller.dto.ChangeTranscriptDto;
import com.example.fyp.entity.Analysis;
import com.example.fyp.model.DetailEmotion;
import com.example.fyp.model.ResponseStatus;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.service.AnalysisService;
import com.example.fyp.service.StorageService;
import com.example.fyp.controller.dto.SuggestionDto;

//Controller to handle recording analyses
@RestController
@RequestMapping("/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    @Autowired
	private StorageService service;

    @Autowired
	private AnalysisRepository analysisRepo;

    @Autowired
    public AnalysisController(AnalysisService analysisService){
        this.analysisService = analysisService;
    }

    @GetMapping("/{recordingId}")
    public ResponseEntity<?> getAnalysisByRecordingId(@PathVariable Integer recordingId) {
        return analysisService.getAnalysisByRecordingId(recordingId);
    }

    @GetMapping("getAnalysisId/{recordingId}")
    public ResponseEntity<?> getAnalysisId(@PathVariable Integer recordingId) {
        Integer analysisId = analysisService.getAnalysisId(recordingId);
        return ResponseEntity.ok(analysisId);
    }

    @PostMapping("/editTranscript")
    public ResponseEntity<String> saveEdit(@RequestBody ChangeTranscriptDto changeTranscriptDto) {
        analysisService.updateDialogByTranscriptAndRecordingId(changeTranscriptDto.getTranscriptId(),
                changeTranscriptDto.getRecordingId(), changeTranscriptDto.getNewTranscript());
        return ResponseEntity.ok("Password Change Successful.");
    }
    
    // Get Analysis
	@GetMapping("/getAnalysis/{recordingId}")
	private ResponseEntity<?> getAnalysis(@PathVariable Integer recordingId) {
		ResponseStatus response = new ResponseStatus();

        // get analysis
        Integer analysisId = analysisService.getAnalysisId(recordingId);
        System.out.println("ANALYSIS ID: " + analysisId);
		Optional<Analysis> analysis = analysisRepo.findById(analysisId);
        
		response.setSuccess(true);
        response.setData(analysis);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
    // Get transcription
    @GetMapping("getTranscription/{recordingId}")
    private ResponseEntity<?> getTranscription(@PathVariable Integer recordingId) {
        ResponseStatus response = new ResponseStatus();

        // get transcription
        Integer analysisId = analysisService.getAnalysisId(recordingId);
        List<Object[]> transcript = service.getTranscriptsByAnalysisId(analysisId);
        System.out.println(transcript);

        response.setSuccess(true);
        response.setData(transcript);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Get Suggestions
    @GetMapping("getSuggestions/{recordingId}")
    private ResponseEntity<?> getSuggestions(@PathVariable Integer recordingId) {
    ResponseStatus response = new ResponseStatus();

    // get analysis
    Integer analysisId = analysisService.getAnalysisId(recordingId);

    System.out.println("ANALYSIS ID: " + analysisId);
    String analysis = analysisRepo.findById(analysisId).get().getNegativeEmotion();

    String[] suggestion_list = analysis.split("\\n");

   Vector<SuggestionDto> suggestions = new Vector<SuggestionDto>();    

   for (int i = 0; i < suggestion_list.length; i++) {
        SuggestionDto suggestion = new SuggestionDto();

        suggestion_list[i] = suggestion_list[i].trim().replace("'", "");
        String[] perSuggestion = suggestion_list[i].trim().split("\\|");

        for (int j = 0; j < perSuggestion.length; j++) {
            perSuggestion[j] = perSuggestion[j].trim();
        }

        suggestion.setTitle(perSuggestion[1]);
        suggestion.setExplanation(perSuggestion[2]);
        suggestion.setImprovedSentence(perSuggestion[3]);
        suggestions.add(suggestion);
    }

    response.setSuccess(true);
    response.setData(suggestions);

    return ResponseEntity.status(HttpStatus.OK).body(response);
}
}
