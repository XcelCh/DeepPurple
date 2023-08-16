package com.example.fyp.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.fyp.entity.Analysis;
import com.example.fyp.entity.Employee;
import com.example.fyp.entity.Recording;
import com.example.fyp.model.ResponseStatus;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.service.AnalysisService;
import com.example.fyp.service.StorageService;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;

import jakarta.persistence.criteria.CriteriaBuilder.In;

import org.apache.commons.text.StringEscapeUtils;

@RestController
@RequestMapping("/audio")
public class UploadController {

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
	public ResponseEntity<?> uploadAudio(@RequestParam("audio") MultipartFile file) throws IOException {
		String uploadImage = service.uploadImage(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(uploadImage);
	}

	// @GetMapping("/{fileName}")
	// public ResponseEntity<?> downloadAudio(@PathVariable String fileName) {
	// 	System.out.println("FILE NAME: " + fileName);
	// 	System.out.
	// 	// byte[] imageData=service.downloadImage(fileName);
	// 	// return ResponseEntity.status(HttpStatus.OK)
	// 	// 		.contentType(MediaType.valueOf("mp3/wav"))
	// 	// 		.body(imageData);

	// 	return ResponseEntity.status(HttpStatus.OK).body("yes");
	// }

	@PostMapping("/uploadAudio2")
	public ResponseEntity<String> uploadFile(@RequestParam("audio2") MultipartFile file) {
		return new ResponseEntity<>(service.uploadFile(file), HttpStatus.OK);
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
	
	@DeleteMapping("/delete/{fileName}")
	public ResponseEntity<String> deleteFile(@PathVariable String fileName){			
		//get the recording object that is about to be deleted
		Optional<Recording> recordingToDelete = recRepo.findByRecordingName(fileName);
		
		//check if there are any employees assigned to the recording
		if(recordingToDelete.get().getEmployee().getEmployeeId() != null) {
			//get the employee details of the recording
			Integer empID = recordingToDelete.get().getEmployee().getEmployeeId();
			Optional<Employee> emp = empRepo.findById(empID);
			emp.get().decrementNumCallsHandled();
		}		
		
		return new ResponseEntity<>(service.deleteFile(fileName), HttpStatus.OK);	
	}
	
	@PostMapping("/updateAudioEmployee")
	public ResponseEntity<?> updateRecordingEmployee(@RequestParam String currentDate, @RequestParam String employeeId, @RequestParam String employeeName) {  
		ResponseStatus response = new ResponseStatus();  
		Integer empID = Integer.parseInt(employeeId);
		  
		  List<Recording> recList = new ArrayList<>();
		  recRepo.findAll().forEach(recList::add);    
		  
		  Optional<Employee> emp = empRepo.findById(empID);		  		 
	         
		  try {
		    LocalDateTime currTime = LocalDateTime.parse(currentDate);
		    
		    for (Recording rec : recList) {
	            if (rec.getUploadDate().isAfter(currTime)) {
	                rec.setEmployee(emp.get());
	                emp.get().incrementNumCallsHandled();
	            }
	        }
	        	        
            recRepo.saveAll(recList); 
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
	 
	 @GetMapping("/getRecordings")
	 public ResponseEntity<?> getAllRecording(@RequestParam(required = false) String currentDate) {
        ResponseStatus<List<Recording>> response = new ResponseStatus<>();

        try {
            List<Recording> recList = new ArrayList<>();
            recRepo.findAll().forEach(recList::add);            
            
            if (currentDate != null && !currentDate.isEmpty()){
                LocalDateTime currTime = LocalDateTime.parse(currentDate);
                recList = recList.stream()                  
                .filter(rec -> rec.getUploadDate().isAfter(currTime))
                        .collect(Collectors.toList());
            }

            // RESPONSE DATA
            response.setSuccess(true);
            response.setData(recList);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception ex) {
            // RESPONSE DATA
            response.setSuccess(false);
            response.setMessage("Fail to get All Employees.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

	// For GPT analysis
	@Value("${apiKey}")
	private String apiKeyContent;

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
