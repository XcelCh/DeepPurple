package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.controller.dto.SummaryAnalysisDto;
import com.example.fyp.entity.Account;
import com.example.fyp.service.AccountServiceImpl;
import com.example.fyp.service.SummaryAnalysisService;

//Controller to handle summary of all the analyses
@RestController
@RequestMapping("/summaryAnalysis")
public class SummaryAnalysisController {
    
    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    SummaryAnalysisService summaryAnalysisService;

    //Get analyses
    @GetMapping("/getAnalysis")
    public ResponseEntity<?> getSummaryAnalysis() {

        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Integer accountId = accountServiceImpl.getAccountId(authentication.getName());

            SummaryAnalysisDto summaryAnalysisDto = summaryAnalysisService.getSummaryAnalysis(accountId);


            return ResponseEntity.ok(summaryAnalysisDto);


        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized.");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Error: " + e );
        }
    }
        
}
