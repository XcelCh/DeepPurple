package com.example.fyp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import com.example.fyp.service.AccountDetailsImpl;
import com.example.fyp.service.AccountServiceImpl;

import com.example.fyp.model.ResponseStatus;
import com.example.fyp.repo.AudioFileRepository;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.service.RecordingListService;
import com.example.fyp.service.SummaryAnalysisService;
import com.example.fyp.model.ResponseStatus;
import com.example.fyp.entity.Account;
import com.example.fyp.entity.Employee;
import com.example.fyp.entity.Recording;
import java.util.Map;
import com.example.fyp.service.AccountServiceImpl;
import com.example.fyp.repo.AccountRepository;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/recordingList")
public class RecordingController {

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    private AccountRepository accountRepository;

    private final RecordingListService recordingListService;

    @Autowired
    public RecordingController(RecordingListService recordingListService) {
        this.recordingListService = recordingListService;
    }

    @Autowired
    private AudioFileRepository recRepo;

    // Get All Recordings
    @GetMapping("/getAllRecordings")
    public ResponseEntity<?> getAllRecording(@RequestParam(required = false) String search) {
        ResponseStatus<List<Map<String, Object>>> response = new ResponseStatus<>();

        try {
            // Retrieve the current authentication token
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            System.out.println("EMAIL: " + email);
            Integer account_id = accountRepository.getAccountId(email);

            System.out.println("ACCOUNT ID: " + account_id);
            List<Map<String, Object>> recList = recordingListService.getRecordingList(account_id);

            if (search != null && !search.isEmpty()) {
                String searchKeyword = "%" + search.toLowerCase() + "%";

                recList = recList.stream()
                        .filter(rec -> ((String) rec.get("recordingName")).contains(search))
                        .collect(Collectors.toList());
            }

            // RESPONSE DATA
            response.setSuccess(true);
            response.setMessage("Successfully Retrieve All Recordings.");
            response.setData(recList);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception ex) {
            // RESPONSE DATA
            response.setSuccess(false);
            response.setMessage("Fail to get All Recordings.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Delete Recording By Id
    @DeleteMapping("/deleteRecordingById/{id}")
    public ResponseEntity<?> deleteRecordingById(@PathVariable Integer id) {
        ResponseStatus response = new ResponseStatus();

        try {
            recRepo.deleteById(id);

            // RESPONSE DATA
            response.setSuccess(true);
            response.setMessage("Recording with Id " + id + " is successfully deleted.");
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (EmptyResultDataAccessException ex) {
            // RESPONSE DATA
            response.setSuccess(false);
            response.setMessage("Fail to delete Recording with Id " + id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    // Get User
     @GetMapping("/user/me")
     public Authentication getCurrentUser() {

         // Retrieve the current authentication token
         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
         String email = authentication.getName();
         Integer account_id = accountRepository.getAccountId(email);

         System.out.println(account_id);

         return authentication;
     }

     @GetMapping("/compare-dates")
     public String compareDates() {
         Map<String, Object> rec = recordingListService.getRecordingById(15);
        String dateTimeObject = (String) rec.get("uploadDate");
        System.out.println("UPLOAD DATESSS" + dateTimeObject);

        //  LocalDateTime dateTime = LocalDateTime.parse(dateTimeString, DateTimeFormatter.ISO_DATE_TIME);
        //  String dateOnly = dateTime.toLocalDate().toString();


         LocalDateTime dateTime1 = LocalDateTime.of(2023, 8, 8, 0, 0);
         LocalDateTime dateTime2 = LocalDateTime.of(2023, 7, 31, 0, 0);

         boolean isBefore = dateTime1.isBefore(dateTime2);
         boolean isAfter = dateTime1.isAfter(dateTime2);
         boolean isEqual = dateTime1.isEqual(dateTime2);

         return "isBefore: " + isBefore + "\nisAfter: " + isAfter + "\nisEqual: " + isEqual;
     }

}
