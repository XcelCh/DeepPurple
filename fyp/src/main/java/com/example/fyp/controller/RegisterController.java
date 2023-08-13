package com.example.fyp.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.controller.dto.CreateAccountDto;
import com.example.fyp.controller.dto.PasswordResetRequestDto;
import com.example.fyp.entity.Account;
import com.example.fyp.entity.Role;
import com.example.fyp.repo.RoleRepository;
import com.example.fyp.service.AccountServiceImpl;
import com.example.fyp.service.EmailServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailServiceImpl emailServiceImpl;

    @Autowired
    private RoleRepository roleRepository;
    
    @PostMapping("/checkEmail")
    public ResponseEntity<String> checkEmail(@RequestBody String body) {

        try {

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(body);
            String email = jsonNode.get("email").asText();

            Account acc = accountServiceImpl.loadUserDetailsByUsername(email);

            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account already exists with that email.");
            
           
        } catch (UsernameNotFoundException e) {

            return ResponseEntity.status(HttpStatus.OK).body("There is no Account with that email.");

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON payload.");
        }

    }

    @PostMapping("/createAccount") 
    public ResponseEntity<String> createAccount (@RequestBody CreateAccountDto createAccountDto) {

        Account account = new Account(createAccountDto.getEmail(), createAccountDto.getFullName(), createAccountDto.getGender(), 
                                    createAccountDto.getPhoneNum(), createAccountDto.getDob(), createAccountDto.getCompanyField());

        // Change id on reset database
        Role roleFree = roleRepository.findById(1);

        String encodePassword = passwordEncoder.encode(createAccountDto.getPassword());
        
        account.setPassword(encodePassword);
        account.addRole(roleFree);
        // account.setProfilePic("default.png");

        accountServiceImpl.saveAccount(account);    

        return ResponseEntity.ok("Account successfully created.");
    }

    @PostMapping("/generatePasswordOTP")
    public ResponseEntity<?> generatePasswordOTP (@RequestBody PasswordResetRequestDto passwordResetRequestDto) {

        try {
            Account account = accountServiceImpl.loadUserDetailsByUsername(passwordResetRequestDto.getEmail());

            Random random = new Random();
            String passwordToken = String.valueOf(random.nextInt(900000) + 100000);

            emailServiceImpl.sendOTPEmail(account, passwordToken);

            System.out.println(passwordToken);

            accountServiceImpl.generatePasswordResetToken(account, passwordToken);

            return ResponseEntity.ok("Account found. Sending OTP to email.");
        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Account Found");
        }
        catch (Exception e) {
            e.printStackTrace();
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }

    @PostMapping("/validateOTP")
    public ResponseEntity<String> validateOTP (@RequestBody PasswordResetRequestDto passwordResetRequestDto) {

        
        try {

            String result = accountServiceImpl.validatePasswordResetToken(passwordResetRequestDto.getOtp(), passwordResetRequestDto.getEmail());

            System.out.println(passwordResetRequestDto.getOtp() + result);

            if (result.equals("expired")) {
                
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP has expired.");
            }

            return ResponseEntity.ok("OTP Successfully verified.");

        }
        catch (EntityNotFoundException e) {
            
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Invalid OTP.");
        }
        catch (Exception e) {

            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error found in verifying.");
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword (@RequestBody PasswordResetRequestDto passwordResetRequestDto) {

        String email = passwordResetRequestDto.getEmail();
        String newPassword = passwordResetRequestDto.getNewPassword();

        String encodePassword = passwordEncoder.encode(newPassword);
        accountServiceImpl.changePassword(email, encodePassword);

        return ResponseEntity.ok("Password Successfully reset.");
    }


}