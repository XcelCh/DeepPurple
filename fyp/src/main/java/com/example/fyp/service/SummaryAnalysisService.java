package com.example.fyp.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.fyp.controller.dto.EmployeeAnalysisDto;
import com.example.fyp.controller.dto.SummaryAnalysisDto;
import com.example.fyp.model.PerformanceComparator;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.repo.TranscriptRepository;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;

//Service class for Analyses summary
@Service
public class SummaryAnalysisService {

    @Autowired
    private RecordingService recordingService;

    @Autowired
    private AnalysisService analysisService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private TranscriptRepository transcriptRepository;

    @Autowired
    private RecordingRepository recordingRepository;

    // For GPT analysis
	@Value("${apiKey}")
	private String apiKeyContent;

    //Get analyses' Summary
    public SummaryAnalysisDto getSummaryAnalysis(Integer accountId, String company) {

        SummaryAnalysisDto summaryAnalysisDto = new SummaryAnalysisDto();

        summaryAnalysisDto.setAverageCallDuration(recordingService.getAvgRecordingDurationByAccount(accountId));

        summaryAnalysisDto.setInquiry(analysisService.countCategoryById("Inquiry", accountId));
        summaryAnalysisDto.setComplaint(analysisService.countCategoryById("Complaint", accountId));
        summaryAnalysisDto.setWarranty(analysisService.countCategoryById("Warranty", accountId));

        summaryAnalysisDto.setPositiveRecSentiment(analysisService.countRecSentiment("Positive", accountId));
        summaryAnalysisDto.setNegativeRecSentiment(analysisService.countRecSentiment("Negative", accountId));
        

        List<EmployeeAnalysisDto> employeeList = new ArrayList<>();
        List<Object []> result = employeeService.getEmployeeByAccountId(accountId);

        for (int x = 0 ; x < result.size(); x++) {

            EmployeeAnalysisDto employeeAnalysisDto = new EmployeeAnalysisDto();
            employeeAnalysisDto.setEmployeeId((int)result.get(x)[0]);
            employeeAnalysisDto.setEmployeeName((String) result.get(x)[1]);
            employeeAnalysisDto.setNumberOfCalls((int) result.get(x)[2]);

            double avgPerformance = recordingService.getAvgPerformanceByEmployee(employeeAnalysisDto.getEmployeeId());
            employeeAnalysisDto.setEmployeeAvgPerformance(Math.round(avgPerformance * 100.0) / 100.0);
            employeeAnalysisDto.setTotalDuration(recordingService.getTotalDurationByEmployee(employeeAnalysisDto.getEmployeeId()));
            employeeAnalysisDto.setPositiveEmpSentiment(analysisService.countEmpSentiment("Positive", employeeAnalysisDto.getEmployeeId()));
            employeeAnalysisDto.setNegativeEmpSentiment(analysisService.countEmpSentiment("Negative", employeeAnalysisDto.getEmployeeId()));
            employeeList.add(employeeAnalysisDto);
        }

        Collections.sort(employeeList, new PerformanceComparator());

        summaryAnalysisDto.setEmployeeList(employeeList);

        // Get suggestion
		List<String> mainIssueList = recordingRepository.getAllMainIssue(accountId);
        String mergedMainIssue = "";
        for(int i = 0; i < mainIssueList.size(); i++) {
            if(i == mainIssueList.size() - 1) {
                mergedMainIssue += "'" + mainIssueList.get(i) + "'.";
            } else{
                mergedMainIssue += "'" + mainIssueList.get(i) + "',";
            }
        }

        String apiKey = apiKeyContent;
        String currentModel = "text-davinci-003";
        // Set up OpenAI API
        OpenAiService openAiService = new OpenAiService(apiKey);

        String prompt = "Provide a detailed 1 paragraph constructive suggestion based on this list of issues compiled from all customer service recordings of a " + company + " company: "
                + mergedMainIssue;
        CompletionRequest categoryRequest = CompletionRequest.builder()
                .model(currentModel)
                .prompt(prompt)
                .echo(true)
                .maxTokens(500)
                .build();
        String response = openAiService.createCompletion(categoryRequest).getChoices().get(0).getText();
        String suggestion = response.substring(prompt.length()).trim();
        summaryAnalysisDto.setSuggestion(suggestion);


        return summaryAnalysisDto;
    }    

}
