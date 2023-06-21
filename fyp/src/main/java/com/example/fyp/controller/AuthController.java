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

}