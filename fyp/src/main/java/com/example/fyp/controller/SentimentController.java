package com.example.fyp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;

import com.example.fyp.model.promptModel;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;

// additional
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import com.example.fyp.model.TextSentimentAnswer;
import com.example.fyp.model.DetailEmotion;

import java.io.IOException;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.util.*;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Value;


@RestController
public class SentimentController {

@Value("${apiKey}")private String apiKeyContent;

        private TextSentimentAnswer textAnalyzer(String sentence) throws RuntimeException{
        String apiKey = apiKeyContent;

        // String apiKey = "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";
                

            String currentModel = "text-davinci-003";
            TextSentimentAnswer t = new TextSentimentAnswer();

            // Set up OpenAI API
            OpenAiService service = new OpenAiService(apiKey);              
            
            //OVERALL SENTIMENT
            String prompt = "Decide if this statement's sentiment is positive, neutral, or negative: " + sentence;
            CompletionRequest sentimentRequest = CompletionRequest.builder()
            .model(currentModel)
            .prompt(prompt)
            .echo(true)
            .maxTokens(60)
            .build();
            String response = service.createCompletion(sentimentRequest).getChoices().get(0).getText();

         	String overallSentiment_raw = response.substring(prompt.length()).trim();
         	String overallSentiment;
         	// Clean Output (.Negative --> Negative)
         	if ( overallSentiment_raw.toLowerCase().indexOf("negative") != -1 ) {
     		overallSentiment = "Negative";
         	} else if (overallSentiment_raw.toLowerCase().indexOf("positive") != -1){
     		overallSentiment = "Positive";
         	}else if (overallSentiment_raw.toLowerCase().indexOf("neutral") != -1){
     		overallSentiment = "Neutral";
         	}else{
     		overallSentiment = "Not found";
         	}

         	System.out.println("overall sentiment: " + overallSentiment);
         	t.setOverallSentiment(overallSentiment);

         	//OVERALL CONTENT
//             	 prompt = "Perform a sentiment analysis on the relevant sentences from" + sentence;
//     		prompt = "Explain the reason why " + sentence + " is a " + overallSentiment + "sentiment. "
//     				+ "Please format the answer as : This sentence is a "+overallSentiment+ " sentiment because of [reason]";
         	prompt = "Analyze the given sentence: \"" + sentence + "\" and explain why it has a " + overallSentiment + " sentiment. Consider the specific aspects, keywords, or phrases that contribute to this sentiment and provide a comprehensive explanation.";
         	
     		CompletionRequest altExplanationRequest = CompletionRequest.builder()
			.model(currentModel)
			.prompt(prompt)
			.echo(true)
			.maxTokens(1000)
			.build();
     		response = service.createCompletion(altExplanationRequest).getChoices().get(0).getText();
     		String overallContent = response.substring(prompt.length()).trim();

     		System.out.println("overall content: " + overallContent);
     		t.setOverallContent(overallContent);

            
     		prompt = "Analyze the given input sentence " + sentence +  " and detect the emotions associated with highlighted keywords or sentences, then give explanation and associate them with a unique color in hexcode that are not too dark."
            		+ " Please format the answer as [Emotion]|[highlighted keyword or sentence]|[explanation]|[hexcode]\n[IF MORE EMOTIONS].";                       		
     		String[] output_array = {""};
//     		boolean segment = true;
//     		while(segment) {
//     			 segment = true;
//     			 CompletionRequest explanationRequest = CompletionRequest.builder()
//                         .model(currentModel)
//                         .prompt(prompt)
//                         .echo(true)
//                         .maxTokens(1000)
//                         .build();
//
//	             response = service.createCompletion(explanationRequest).getChoices().get(0).getText();
//	             String output = response.substring(prompt.length()).trim();
//	             output_array = output.split("\n");
//	             for (int i = 0; i < output_array.length; i++) {
//	            	 if(output_array[i].split("\\|").length >= 4) {
//	            		 segment = false;
//	            	 }else {
//	            		 segment = true;
//	            	 }
//	             }
//	             
//	             if(!segment) {
//	            	 break;
//	             }
//	             
//     		}
     		
     		CompletionRequest explanationRequest = CompletionRequest.builder()
                    .model(currentModel)
                    .prompt(prompt)
                    .echo(true)
                    .maxTokens(1000)
                    .build();

            response = service.createCompletion(explanationRequest).getChoices().get(0).getText();
            String output = response.substring(prompt.length()).trim();
            output_array = output.split("\n");     	
           
          
            Vector<DetailEmotion> emotions = new Vector<DetailEmotion>();            
            System.out.println(output_array.length);            
            for (int i = 0; i < output_array.length; i++) {            
            	// System.out.println(output_array[i]);            	
                // System.out.println("Regex length (FORDEBUG)" + output_array[i].split("\\|").length);

                // check if highlighte is inside the text
                DetailEmotion d = new DetailEmotion();
                System.out.println("sentence: " + sentence.toLowerCase());
                System.out.println("highlighted: " + output_array[i].split("\\|")[1].toLowerCase());
                if (!sentence.toLowerCase().contains(output_array[i].split("\\|")[1].toLowerCase().replaceAll("\"", ""))) {
                        d.setTitle(output_array[i].split("\\|")[0]);
                        d.setHighlighted(output_array[i].split("\\|")[1]);
                        d.setExplanation(output_array[i].split("\\|")[2]);
                        d.setColor("#E6E9ED");
                } else {
                        d.setTitle(output_array[i].split("\\|")[0]);
                        d.setHighlighted(output_array[i].split("\\|")[1]);
                        d.setExplanation(output_array[i].split("\\|")[2]);
                        d.setColor(output_array[i].split("\\|")[3]);
                }

               
                emotions.add(d);
            }

            t.setEmotions(emotions);             

            return t;
        }

        @GetMapping("/")
        public String index() {
                return "index";
        }

        @CrossOrigin(origins = "*", exposedHeaders = "Referrer-Policy")
        @PostMapping(value = "/analyze", produces = MediaType.APPLICATION_JSON_VALUE)
        @ResponseBody
        public TextSentimentAnswer inputSentence(ModelMap model, @ModelAttribute promptModel prompt){        	
        		while(true) {
        			try {        		
    	        		TextSentimentAnswer response = textAnalyzer(prompt.prompt());     
    					return response;
            		}catch(RuntimeException e) {            			
        				System.out.println("Runtime Exception occurred : "+ e.getMessage());            		      		            			
            		}	
        		}        		
                        
        }

}
