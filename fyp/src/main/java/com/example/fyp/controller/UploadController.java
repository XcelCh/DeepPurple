package com.example.fyp.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.fyp.entity.Account;
import com.example.fyp.entity.Analysis;
import com.example.fyp.entity.Employee;
import com.example.fyp.entity.Recording;
import com.example.fyp.model.ResponseStatus;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.service.AccountServiceImpl;
import com.example.fyp.service.AnalysisService;
import com.example.fyp.service.RecordingListService;
import com.example.fyp.service.RecordingService;
import com.example.fyp.service.StorageService;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;

@RestController
@RequestMapping("/audio")
public class UploadController {
	
	private final RecordingListService recordingListService;		
    private final AccountServiceImpl accountServiceImpl;
    
    @Autowired
    public UploadController(RecordingListService recordingListService, AccountServiceImpl accountServiceImpl) {
        this.recordingListService = recordingListService;
       
        this.accountServiceImpl = accountServiceImpl;
    }

	@Autowired
	private StorageService service;
	
	@Autowired
	private RecordingRepository recRepo;
	
	@Autowired
	private EmployeeRepository empRepo;

	@Autowired
	private AnalysisRepository analysisRepo;

	@Autowired
	private AnalysisService analysisService;

	@PostMapping("/uploadAudio")
	public ResponseEntity<String> uploadFile(@RequestParam("audio") MultipartFile file) {
		// Retrieve the current authentication token
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();        
        Account account = accountServiceImpl.loadUserDetailsByUsername(email);
        
		return new ResponseEntity<>(service.uploadFile(file, account), HttpStatus.OK);
	}
	
	@GetMapping("/download/{fileName}")
	public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName){
		byte[] data = service.downloadFile(fileName);
		ByteArrayResource resource = new ByteArrayResource(data);
		return ResponseEntity
				.ok()
				.contentLength(data.length)
				.header("Content-type", "application/octet-stream")
				.header("Content-disposition", "attachment; filename=\"" + fileName + " \"")
				.body(resource);
	}
	
	@DeleteMapping("/deleteFile")
	public ResponseEntity<String> deleteFile(@RequestParam String fileName, @RequestParam String recID){			
		//get the recording object that is about to be deleted
		Integer recording_id = Integer.parseInt(recID);
		Optional<Recording> recordingToDelete = recRepo.findById(recording_id);
		
		//check if there are any employees assigned to the recording
		if(recordingToDelete.get().getEmployee() != null) {
			//get the employee details of the recording
			Integer empID = recordingToDelete.get().getEmployee().getEmployeeId();
			Optional<Employee> emp = empRepo.findById(empID);
			emp.get().decrementNumCallsHandled();
		}		
		
		recRepo.delete(recordingToDelete.get());
		
		return new ResponseEntity<>(service.deleteFile((recordingToDelete.get().getTimeStamp()+"_"+fileName)), HttpStatus.OK);	
	}
	
	@PostMapping("/updateAudioEmployee")
	public ResponseEntity<?> updateRecordingEmployee(@RequestParam String currentDate, @RequestParam String employeeId, @RequestParam String employeeName) {  
		// Retrieve the current authentication token
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String email = authentication.getName();        
	    Integer account_id = accountServiceImpl.getAccountId(email);
		
		ResponseStatus response = new ResponseStatus();  
		Integer empID = Integer.parseInt(employeeId);
		
	  
		List<Map<String, Object>> recList = recordingListService.getRecordingList(account_id);		   
	  
		Optional<Employee> emp = empRepo.findById(empID);		  		 
         
		try {
			LocalDateTime currTime = LocalDateTime.parse(currentDate);
	    
			for (Map<String, Object> rec : recList) {		
	            if (((LocalDateTime) rec.get("uploadDate")).isAfter(currTime)) {
					System.out.println(rec.get("recordingName"));
	            	if(((Employee) rec.get("employee")) != null) {
	            		if(((Integer)((Employee) rec.get("employee")).getEmployeeId()) == emp.get().getEmployeeId()) {
	            			//skip if recording already assigned to same employee
	            			continue;
	            		}	            		
	            		((Employee) rec.get("employee")).decrementNumCallsHandled();
	            	}
    	       
	            Optional<Recording> r = recRepo.findById((Integer) rec.get("recordingId"));
	            	
                (r.get()).setEmployee(emp.get());                
                (r.get()).setEmployeeName(employeeName);
                emp.get().incrementNumCallsHandled();
                recRepo.save(r.get());
	            }
			}
        	        			
			empRepo.save(emp.get());
			// RESPONSE DATA
			response.setSuccess(true);
			response.setData(recList);
			return ResponseEntity.status(HttpStatus.OK).body(response);
            
    	} catch (Exception e)  {
    		// RESPONSE DATA
    		response.setSuccess(false);
    		response.setMessage("Fail to get All Employees.");
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
	  	  
	 }
	
	@PostMapping("/updateRecordingEmployeeByDelimiter")
	public ResponseEntity<?> updateRecordingEmployeeByDelimiter(@RequestParam String recordingID, @RequestParam String empName) {
		ResponseStatus response = new ResponseStatus();
		Integer recID = Integer.parseInt(recordingID);
				
		Optional<Recording> recToUpdate = recRepo.findById(recID);
		Optional<Employee> empToUpdate = empRepo.findByEmployeeName(empName);		
		
		try {
			if(recToUpdate.get().getEmployee() != null) {
				//check for double assignment
				if(recToUpdate.get().getEmployee().getEmployeeId() == empToUpdate.get().getEmployeeId()) {
					response.setSuccess(false);
					response.setMessage("Employee already assigned to this recording!");
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
				}
				
				recToUpdate.get().getEmployee().decrementNumCallsHandled();
			}
			
			recToUpdate.get().setEmployee(empToUpdate.get());	
			recToUpdate.get().setEmployeeName(empName);
			empToUpdate.get().incrementNumCallsHandled();			
			
			recRepo.save(recToUpdate.get());
			empRepo.save(empToUpdate.get());
			// RESPONSE DATA
            response.setSuccess(true);            
            return ResponseEntity.status(HttpStatus.OK).body(response);
			
		} catch (Exception e) {
			response.setSuccess(false);
            response.setMessage("Fail to update Employee.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
		
		
	}
	
	@GetMapping("/getRecordings")
    public ResponseEntity<?> getAllRecording(@RequestParam(required = false) String currentDate) {
        ResponseStatus<List<Map<String, Object>>> response = new ResponseStatus<>();

        try {
            // Retrieve the current authentication token
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            Integer account_id = accountServiceImpl.getAccountId(email);
            System.out.println("ACCOUNT ID: " + account_id);

            List<Map<String, Object>> recList = recordingListService.getRecordingList(account_id);

            System.out.println("RECORDING: " + recList);

            if (currentDate != null && !currentDate.isEmpty()) {
            	LocalDateTime currTime = LocalDateTime.parse(currentDate);

                recList = recList.stream()
                        .filter(rec -> ((LocalDateTime) rec.get("uploadDate")).isAfter(currTime))
                        .collect(Collectors.toList());
            }

            // RESPONSE DATA
            response.setSuccess(true);
            response.setMessage("Successfully Retrieve All Recordings.");
            response.setData(recList);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception ex) {
            // RESPONSE DATA
            response.setSuccess(false);
            response.setMessage("Fail to get All Recordings.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
	 	 

	// For GPT analysis
	@Value("${apiKey}")
	private String apiKeyContent;

	// Get Analysis
	@GetMapping("/getAnalysis/{analysis_id}")
	private ResponseEntity<?> getAnalysis(@PathVariable Integer analysis_id) {
		ResponseStatus response = new ResponseStatus();
		Optional<Analysis> analysis = analysisRepo.findById(analysis_id);

		response.setSuccess(true);
		response.setData(analysis);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	// Analyze
	@PostMapping("/analyze")
	private Analysis recordAnalyzer(Integer analysisId) throws RuntimeException {

		System.out.println("ANALYSIS ID: " + analysisId);

        String apiKey = apiKeyContent;

        String currentModel = "text-davinci-003";

		Analysis analysis = analysisService.findAnalysisById(analysisId);

        // Set up OpenAI API
        OpenAiService openAiService = new OpenAiService(apiKey);              
        
		// Merge all the transcripts and prefix with Agent / Customer
		List<Object[]> unformattedTranscripts = service.getTranscriptsByAnalysisId(analysisId);

		String formattedTranscripts = "";
		
		for (Object[] innerArray : unformattedTranscripts) {
			if ((boolean) innerArray[0]) {
				formattedTranscripts += "Agent: " + (String) innerArray[1] + "\n";
			} else {
				formattedTranscripts += "Customer: " + (String) innerArray[1] + "\n";
			}
		}
		
		System.out.println("FORMATTED TRANSCRIPTS: \n" + formattedTranscripts);

		// // Combined prompt
		// String systemInstructions = "You are an AI language model. Answer each of the following question in 1 word except the second question. End each answer with '\n'.\n";
		// String prompt = formattedTranscripts.toString()
		// 			+ "Decide if this conversation category is Inquiry, Complaint, or Warranty: \n"
		// 			+ "Summarize this customer service conversation into 1 paragraph: \n"
		// 			+ "Decide if the customer's sentiment is positive or negative based on this conversation (positive means the customer is not in emotional state, otherwise negative): \n"
		// 			+ "Decide if the agent's sentiment is positive or negative based on this conversation (positive means the agent is not in emotional state, otherwise negative): \n"
		// 			+ "Decide if the call sentiment is positive or negative based on this conversation (positive means the call's objectives are achieved, otherwise negative): ";
        // CompletionRequest categoryRequest = CompletionRequest.builder()
        //                                                     .model(currentModel)
        //                                                     .prompt(systemInstructions + prompt)
        //                                                     .echo(true)
        //                                                     .maxTokens(300)
        //                                                     .build();
		// String response = openAiService.createCompletion(categoryRequest).getChoices().get(0).getText();
		// String categoryRaw = response.substring(systemInstructions.length() + prompt.length()).trim();
		// return categoryRaw;

		// Category
		String prompt = "Decide if this conversation category is Inquiry, Complaint, or Warranty: " + formattedTranscripts;
        CompletionRequest categoryRequest = CompletionRequest.builder()
                                                            .model(currentModel)
                                                            .prompt(prompt)
                                                            .echo(true)
                                                            .maxTokens(60)
                                                            .build();
        String response = openAiService.createCompletion(categoryRequest).getChoices().get(0).getText();
		String categoryRaw = response.substring(prompt.length()).trim();
        String category;

        if (categoryRaw.toLowerCase().indexOf("inquiry") != -1 ) {
            category = "Inquiry";
        } else if (categoryRaw.toLowerCase().indexOf("complaint") != -1){
            category = "Complaint";
        } else if (categoryRaw.toLowerCase().indexOf("warranty") != -1){
            category = "Warranty";
        } else{
            category = "Not found";
        }

		analysis.setCategory(category);


		// Summary
		prompt = "Summarize this customer service conversation into 1 paragraph: " + formattedTranscripts;
        CompletionRequest summaryRequest = CompletionRequest.builder()
                                                            .model(currentModel)
                                                            .prompt(prompt)
                                                            .echo(true)
                                                            .maxTokens(60)
                                                            .build();
        response = openAiService.createCompletion(summaryRequest).getChoices().get(0).getText();
		String summary = response.substring(prompt.length()).trim();

		analysis.setSummary(summary);

		// Customer sentiment
		prompt = "Decide if the customer's sentiment is positive or negative based on this conversation (negative if the customer shows many signs of frustration / bad emotions, otherwise positive): " + formattedTranscripts;
        CompletionRequest customerSentimentRequest = CompletionRequest.builder()
																	.model(currentModel)
																	.prompt(prompt)
																	.echo(true)
																	.maxTokens(60)
																	.build();
        response = openAiService.createCompletion(customerSentimentRequest).getChoices().get(0).getText();
		String customerSentimentRaw = response.substring(prompt.length()).trim();
        String customerSentiment;

		if (customerSentimentRaw.toLowerCase().indexOf("positive") != -1 ) {
			customerSentiment = "Positive";
		} else if (customerSentimentRaw.toLowerCase().indexOf("negative") != -1){
			customerSentiment = "Negative";
		} else{
			customerSentiment = "Not found";
		}

		analysis.setCustomerSentiment(customerSentiment);


		// Employee sentiment
		prompt = "Decide if the agent's sentiment is positive or negative based on this conversation (positive if the agent's being polite and understanding when talking to the customer, otherwise negative): " + formattedTranscripts;
        CompletionRequest employeeSentimentRequest = CompletionRequest.builder()
																.model(currentModel)
																.prompt(prompt)
																.echo(true)
																.maxTokens(1000)
																.build();
        response = openAiService.createCompletion(employeeSentimentRequest).getChoices().get(0).getText();
		String employeeSentimentRaw = response.substring(prompt.length()).trim();
        String employeeSentiment;

        if (employeeSentimentRaw.toLowerCase().indexOf("positive") != -1 ) {
            employeeSentiment = "Positive";
        } else if (employeeSentimentRaw.toLowerCase().indexOf("negative") != -1){
            employeeSentiment = "Negative";
        } else{
            employeeSentiment = "Not found";
        }

		analysis.setEmployeeSentiment(employeeSentiment);

		// Call sentiment
		prompt = "Decide if the call sentiment is positive or negative based on this conversation (positive means the call's objectives are achieved, otherwise negative): " + formattedTranscripts;
        CompletionRequest callSentimentRequest = CompletionRequest.builder()
																.model(currentModel)
																.prompt(prompt)
																.echo(true)
																.maxTokens(60)
																.build();
        response = openAiService.createCompletion(callSentimentRequest).getChoices().get(0).getText();
		String callSentimentRaw = response.substring(prompt.length()).trim();
        String callSentiment;

        if (callSentimentRaw.toLowerCase().indexOf("positive") != -1 ) {
            callSentiment = "Positive";
        } else if (callSentimentRaw.toLowerCase().indexOf("negative") != -1){
            callSentiment = "Negative";
        } else{
            callSentiment = "Not found";
        }

		analysis.setRecordingSentiment(callSentiment);

		// Main issue
		prompt = "Describe the main issue into just a few words based on this conversation: " + formattedTranscripts;
        CompletionRequest mainIssueRequest = CompletionRequest.builder()
															.model(currentModel)
															.prompt(prompt)
															.echo(true)
															.maxTokens(60)
															.build();
        response = openAiService.createCompletion(mainIssueRequest).getChoices().get(0).getText();
		String mainIssue = response.substring(prompt.length()).trim();

		analysis.setMainIssue(mainIssue);

		// Employee performance
		prompt = "This is a telecommunication company and please provide an objective assessment of the agent's Interaction Skill using the following parameters:\n" + //
				"\n" + //
				"- Fluency: rating/100\n" + //
				"- Hospitality: rating/100\n" + //
				"- Problem Solving: rating/100\n" + //
				"- Personalization: rating/100" + //
				" Based on the following conversation: " + formattedTranscripts + //
				". Please provide your ratings for each parameter. Your ratings should reflect your unbiased evaluation of the agent's skills. Keep in mind that the ratings should be within a reasonable range and should not be overly high. An average score around 80 is expected.\r\n" + //
				"[You do not need to explain anything. Just respond with the format given.]";
				
        CompletionRequest employeePerformanceRequest = CompletionRequest.builder()
															.model(currentModel)
															.prompt(prompt)
															.echo(true)
															.maxTokens(1000)
															.build();
        response = openAiService.createCompletion(employeePerformanceRequest).getChoices().get(0).getText();
		String employeePerformance = response.substring(prompt.length()).trim();

		// System.out.println(employeePerformance);
		double fluency = analysisService.getScore(employeePerformance, "fluency: ");
		double hospitality = analysisService.getScore(employeePerformance, "hospitality: ");
		double problem = analysisService.getScore(employeePerformance, "problem solving: ");
		double personalization = analysisService.getScore(employeePerformance, "personalization: ");
		double average = (fluency + hospitality + problem + personalization)/4;

		analysis.setFluency(fluency);
		analysis.setHospitality(hospitality);
		analysis.setProblemSolving(problem);
		analysis.setPersonalization(personalization);
		analysis.setAveragePerformance(average);

		// Negative Emotions
		prompt = "List down 3 short sentences spoken by our agent which is prefixed with 'Agent:' in the conversation that you think can be improved in terms of good hospitality and manner. Answer in the following format: \n" + 
				"'1|[old sentence spoken by agent]|[explanation why the old sentence can be improved or impolite]|[improved sentence]'\n" +
				"'2|[old sentence spoken by agent]|[explanation]|[improved sentence]'\n" +
				"'3|[old sentence spoken by agent]|[explanation]|[improved sentence]'\n" +
				"Pleae follow the format. Based on this conversation:\n" + formattedTranscripts + "\n";

        CompletionRequest negativeEmotionsRequest = CompletionRequest.builder()
															.model(currentModel)
															.prompt(prompt)
															.echo(true)
															.maxTokens(1500)
				.build();
															
        response = openAiService.createCompletion(negativeEmotionsRequest).getChoices().get(0).getText();
		String negativeEmotions = response.substring(prompt.length()).trim();

		analysis.setNegativeEmotion(negativeEmotions);

		analysisService.saveAnalysis(analysis);

		return analysis;
    }
	
}
