package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.controller.dto.LoginDto;
import com.example.fyp.repo.AccountRepository;
import com.example.fyp.security.jwt.JwtUtils;
import com.example.fyp.security.payload.response.JwtResponse;
import com.example.fyp.service.AccountDetailsImpl;

// Controller to authenticate user from login page
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

  // Signin endpoint which generate and return JWT Token upon successful authentication
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    AccountDetailsImpl accountDetails = (AccountDetailsImpl) authentication.getPrincipal();

    return ResponseEntity.ok(new JwtResponse(jwt, accountDetails.getUsername()));
  }
}