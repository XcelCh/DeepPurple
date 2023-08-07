package com.example.fyp.controller;

import java.io.IOException;

import javax.print.attribute.standard.Media;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.controller.dto.ChangePasswordDto;
import com.example.fyp.entity.Account;
import com.example.fyp.service.AccountDetailsImpl;
import com.example.fyp.service.AccountServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.micrometer.core.ipc.http.HttpSender.Response;

@RestController
@RequestMapping("/profile")
public class EditProfileController {

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    
    @GetMapping("/editProfile")
    public ResponseEntity<?> editProfile() {

        Account acc = new Account();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {

            String username = authentication.getName();

            acc = accountServiceImpl.loadUserDetailsByUsername(username);

            acc.setPassword(null);
            acc.setRoles(null);
            // System.out.println(acc);

            return ResponseEntity.ok().body(acc);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged In or Token Expired.");
        

    }

    @PostMapping("/editProfile")
    public ResponseEntity<String> saveEdit(@RequestBody Account account) {
        

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccountDetailsImpl userPrincipal = (AccountDetailsImpl) authentication.getPrincipal();

        Account acc = accountServiceImpl.loadUserDetailsByUsername(userPrincipal.getUsername());

        account.setAccountId(acc.getAccountId());
        account.setProfilePic(acc.getProfilePic());
        account.setPassword(acc.getPassword());
        account.setRoles(acc.getRoles());
        
        accountServiceImpl.saveAccount(account);

        return ResponseEntity.ok("Edit Profile received succesfully.");
    }

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

    @GetMapping("/getProfilePic")
    public ResponseEntity<byte[]> getProfilePicture() throws IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        Account acc = accountServiceImpl.loadUserDetailsByUsername(username);


        String profilePic = "profilepic/" + acc.getProfilePic();

        var imgFile = new ClassPathResource(profilePic);
        byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());

        MediaType contentType = profilePic.contains(".png") ? MediaType.IMAGE_PNG : MediaType.IMAGE_JPEG;

        return ResponseEntity.ok().contentType(contentType).body(bytes);
    }

    @GetMapping("/getCompanyField")
    public ResponseEntity<String> getCompanyField() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        Account acc = accountServiceImpl.loadUserDetailsByUsername(username);

        String companyField = acc.getCompanyField();


        return ResponseEntity.ok().body(companyField);
    }

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
