package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.controller.dto.ChangePasswordDto;
import com.example.fyp.controller.dto.EditProfileDto;
import com.example.fyp.entity.Account;
import com.example.fyp.service.AccountDetailsImpl;
import com.example.fyp.service.AccountServiceImpl;

// Controller for profile related endpoints
@RestController
@RequestMapping("/profile")
public class EditProfileController {

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    
    // Get profile details and check for Unauthorized token in editProfile endpoints
    @GetMapping("/editProfile")
    public ResponseEntity<?> editProfile() {

        Account acc = new Account();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {

            String username = authentication.getName();
            acc = accountServiceImpl.loadUserDetailsByUsername(username);

            return ResponseEntity.ok().body(acc);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged In or Token Expired.");
    }

    // Edit profile details that are changed by the POST method editProfile endpoints
    @PostMapping("/editProfile")
    public ResponseEntity<String> saveEdit(@RequestBody EditProfileDto editProfileDto) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccountDetailsImpl userPrincipal = (AccountDetailsImpl) authentication.getPrincipal();

        Account acc = accountServiceImpl.loadUserDetailsByUsername(userPrincipal.getUsername());

        acc.setFullName(editProfileDto.getFullName());
        acc.setGender(editProfileDto.getGender());
        acc.setDob(editProfileDto.getDob());
        acc.setPhoneNum(editProfileDto.getPhoneNum());
        acc.setCompanyField(editProfileDto.getCompanyField());
        
        accountServiceImpl.saveAccount(acc);

        return ResponseEntity.ok("Edit Profile received succesfully.");
    }

    // changePassword endpoints to handle changing of password
    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDto changePasswordDto) {

        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            if (authentication != null) {

                String username = authentication.getName();
                Account acc = accountServiceImpl.loadUserDetailsByUsername(username);
                String oldPassword = acc.getPassword();

                if (passwordEncoder.matches(changePasswordDto.getCurrentPassword(), oldPassword)) {

                    acc.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
                    accountServiceImpl.saveAccount(acc);

                    return  ResponseEntity.ok("Password Change Successful.");
                }
            }
        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in.");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Cannot Process, "+ e);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password does not match.");
    }

    // Get Company Field of the profile and return by the getCompanyField endpoint
    @GetMapping("/getCompanyField")
    public ResponseEntity<String> getCompanyField() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        Account acc = accountServiceImpl.loadUserDetailsByUsername(username);

        String companyField = acc.getCompanyField();

        return ResponseEntity.ok().body(companyField);
    }

    // Set the company field received by the setCompanyField POST endpoint
    @PostMapping("/setCompanyField")
    public ResponseEntity<String> setCompanyField(@RequestBody String companyField) {   

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        Account acc = accountServiceImpl.loadUserDetailsByUsername(username);

        acc.setCompanyField(companyField);
        accountServiceImpl.saveAccount(acc);

        return ResponseEntity.ok().body("Set Company Field Successful.");
    }
}
