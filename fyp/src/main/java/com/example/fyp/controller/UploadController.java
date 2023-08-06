package com.example.fyp.controller;

import java.io.IOException;
import java.util.List;
import java.util.Vector;
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

import com.example.fyp.model.DetailEmotion;
import com.example.fyp.model.RecordingAnalysisAnswer;
import com.example.fyp.model.TextSentimentAnswer;
import com.example.fyp.model.promptModel;
import com.example.fyp.service.StorageService;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;


@RestController
@RequestMapping("/audio")
public class UploadController {

	@Autowired
	private StorageService service;

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
	public ResponseEntity<ByteArrayResource> downloadFile(String fileName){
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
		return new ResponseEntity<>(service.deleteFile(fileName), HttpStatus.OK);
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
		List<Object[]> unformattedTranscripts = service.getTranscriptsByRecordingId(13);
		String formattedTranscripts = "";
		
		for (Object[] innerArray : unformattedTranscripts) {
			if((Integer) innerArray[0] == 1) {
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
		prompt = "Decide if the customer's sentiment is positive or negative based on this conversation (positive means the customer is not in emotional state, otherwise negative): " + formattedTranscripts;
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
		prompt = "Decide if the agent's sentiment is positive or negative based on this conversation (positive means the agent is not in emotional state, otherwise negative): " + formattedTranscripts;
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

		return ans;
    }
	
}
