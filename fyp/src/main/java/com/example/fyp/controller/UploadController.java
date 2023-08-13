package com.example.fyp.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Vector;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.fyp.entity.Employee;
import com.example.fyp.entity.Recording;
import com.example.fyp.model.DetailEmotion;
import com.example.fyp.model.RecordingAnalysisAnswer;
import com.example.fyp.model.TextSentimentAnswer;
import com.example.fyp.model.promptModel;
import com.example.fyp.model.ResponseStatus;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.service.StorageService;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;


@RestController
@RequestMapping("/audio")
public class UploadController {

	@Autowired
	private StorageService service;
	
	@Autowired
	private RecordingRepository recRepo;
	
	@Autowired
	private EmployeeRepository empRepo;

	@PostMapping("/uploadAudio")
	public ResponseEntity<?> uploadAudio(@RequestParam("audio") MultipartFile file) throws IOException {
		String uploadImage = service.uploadImage(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(uploadImage);
	}

	@GetMapping("/{fileName}")
	public ResponseEntity<?> downloadAudio(@PathVariable String fileName){
		byte[] imageData=service.downloadImage(fileName);
		return ResponseEntity.status(HttpStatus.OK)
				.contentType(MediaType.valueOf("mp3/wav"))
				.body(imageData);
	}

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

	@GetMapping("/analyze")
    private RecordingAnalysisAnswer recordAnalyzer() throws RuntimeException{
        String apiKey = apiKeyContent;

        String currentModel = "text-davinci-003";
        RecordingAnalysisAnswer ans = new RecordingAnalysisAnswer();

        // Set up OpenAI API
        OpenAiService openAiService = new OpenAiService(apiKey);              
        
		// Merge all the transcripts and prefix with Agent / Customer
		List<Object[]> unformattedTranscripts = service.getTranscriptsByAnalysisId(3);
		String formattedTranscripts = "";
		
		for (Object[] innerArray : unformattedTranscripts) {
			if((boolean) innerArray[0]) {
				formattedTranscripts += "Agent: " + (String) innerArray[1] + "\n";
			} else {
				formattedTranscripts += "Customer: " + (String) innerArray[1] + "\n";
			}
		}

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

		ans.setCategory(category);


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

		ans.setSummary(summary);


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

		ans.setCustomerSentiment(customerSentiment);


		// Employee sentiment
		prompt = "Decide if the agent's sentiment is positive or negative based on this conversation (negative if the agent's hospitality is below customer service standards, otherwise positive): " + formattedTranscripts;
        CompletionRequest employeeSentimentRequest = CompletionRequest.builder()
																.model(currentModel)
																.prompt(prompt)
																.echo(true)
																.maxTokens(60)
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

		ans.setEmployeeSentiment(employeeSentiment);


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

		ans.setCallSentiment(callSentiment);

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

		ans.setMainIssue(mainIssue);

		// Employee performance
		prompt = "This is a telecommunication company and you are tasked to provide an objective assessment of the agent's performance using the following parameters:\n" + //
				"\n" + //
				"- Fluency: rating/100\n" + //
				"- Hospitality: rating/100\n" + //
				"- Problem Solving: rating/100\n" + //
				"- Knowledge and Expertise: rating/100" + //
				"based on the following conversation: " + formattedTranscripts + //
				". You do not need to explain anything. Just respond with the format given. You are not forced to gives a very high marks.";
        CompletionRequest employeePerformanceRequest = CompletionRequest.builder()
															.model(currentModel)
															.prompt(prompt)
															.echo(true)
															.maxTokens(60)
															.build();
        response = openAiService.createCompletion(employeePerformanceRequest).getChoices().get(0).getText();
		String employeePerformance = response.substring(prompt.length()).trim();

		ans.setEmployeePerformance(employeePerformance);

		// Employee performance
		prompt = "List down the sentences spoken by our agent that you think can be improved in terms of good hospitality and manner. Answer in the following format: \n" + 
				"'- [bad sentence]|[corrected sentence]|[explanation]'\n" +
				"Based on this conversation:\n" + formattedTranscripts + "\n" +
				"Don't include grammar, contractions, and spelling errors.";
        CompletionRequest negativeEmotionsRequest = CompletionRequest.builder()
															.model(currentModel)
															.prompt(prompt)
															.echo(true)
															.maxTokens(200)
															.build();
        response = openAiService.createCompletion(negativeEmotionsRequest).getChoices().get(0).getText();
		String negativeEmotions = response.substring(prompt.length()).trim();

		ans.setNegativeEmotions(negativeEmotions);

		return ans;
    }
	
}
