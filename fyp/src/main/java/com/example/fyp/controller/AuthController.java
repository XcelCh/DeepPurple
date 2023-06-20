package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.controller.dto.LoginDto;
import com.example.payload.response.JwtResponse;
import com.example.fyp.repo.AccountRepository;
import com.example.fyp.security.jwt.JwtUtils;
import com.example.fyp.service.AccountDetailsImpl;

// TextSentiment 
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.ui.Model;
import com.example.fyp.model.promptModel;
import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;

// additional
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import com.example.fyp.model.TextSentimentAnswer;
import com.example.fyp.model.DetailEmotion;
import java.util.*;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

@RequestMapping("/api/auth")
public class AuthController {
      
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  AccountRepository accountRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    AccountDetailsImpl accountDetails = (AccountDetailsImpl) authentication.getPrincipal();

    return ResponseEntity.ok(new JwtResponse(jwt,
        accountDetails.getEmail()));
  }

  // Text Sentiment
  private TextSentimentAnswer textAnalyzer(String sentence) {
    String apiKey = "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";

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
    if (overallSentiment_raw.toLowerCase().indexOf("negative") != -1) {
      overallSentiment = "Negative";
    } else if (overallSentiment_raw.toLowerCase().indexOf("positive") != -1) {
      overallSentiment = "Positive";
    } else if (overallSentiment_raw.toLowerCase().indexOf("neutral") != -1) {
      overallSentiment = "Neutral";
    } else {
      overallSentiment = "Not found";
    }

    System.out.println("overall sentiment: " + overallSentiment);
    t.setOverallSentiment(overallSentiment);

    //OVERALL CONTENT
    //             	 prompt = "Perform a sentiment analysis on the relevant sentences from" + sentence;
    prompt = "Explain why " + sentence + " has " + overallSentiment + "sentiment";
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

    prompt = "Analyze the given sentence " + sentence
        + "and detect the emotions associated with highlighted keywords or sentences, then give explanation and associate them with a color in hexcode."
        + " Please format the answer as [Emotion]|[highlighted keyword or sentence]|[explanation]|[hexcode]\n[IF MORE EMOTIONS]";

    CompletionRequest explanationRequest = CompletionRequest.builder()
        .model(currentModel)
        .prompt(prompt)
        .echo(true)
        .maxTokens(1000)
        .build();

    response = service.createCompletion(explanationRequest).getChoices().get(0).getText();
    String output = response.substring(prompt.length()).trim();
    String[] output_array = output.split("\n");

    Vector<DetailEmotion> emotions = new Vector<DetailEmotion>();
    System.out.println(output_array.length);
    for (int i = 0; i < output_array.length; i++) {
      // System.out.println("output_array: " + output_array[i]);
      if (output_array[i].replaceAll("\\s+", "") != "") {
        DetailEmotion d = new DetailEmotion();
        d.setTitle(output_array[i].split("\\|")[0]);
        d.setHighlighted(output_array[i].split("\\|")[1]);
        d.setExplanation(output_array[i].split("\\|")[2]);
        d.setColor(output_array[i].split("\\|")[3]);
        emotions.add(d);
      }
    }

    t.setEmotions(emotions);

    return t;
  }
        
  @CrossOrigin(origins = "*", exposedHeaders = "Referrer-Policy")
  @PostMapping(value = "/analyze", produces = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public TextSentimentAnswer inputSentence(Model model, @ModelAttribute promptModel prompt) {
          TextSentimentAnswer response = textAnalyzer(prompt.prompt());
          return response;
  }

}