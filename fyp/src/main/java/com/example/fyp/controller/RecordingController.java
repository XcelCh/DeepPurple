package com.example.fyp.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.model.ResponseStatus;
import com.example.fyp.repo.AudioFileRepository;
import com.example.fyp.service.AccountServiceImpl;
import com.example.fyp.service.RecordingListService;
import com.example.fyp.service.RecordingService;

@RestController
@RequestMapping("/recordingList")
public class RecordingController implements Function<List<Integer>, ResponseEntity<String>>{

    // @Autowired
    // private AccountRepository accountRepository;

    private final RecordingListService recordingListService;
    private final RecordingService recordingService;
    private final AccountServiceImpl accountServiceImpl;

    @Autowired
    public RecordingController(RecordingListService recordingListService, RecordingService recordingService, AccountServiceImpl accountServiceImpl){
        this.recordingListService = recordingListService;
        this.recordingService = recordingService;
        this.accountServiceImpl = accountServiceImpl;
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
            Integer account_id = accountServiceImpl.getAccountId(email);

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
        Integer account_id = accountServiceImpl.getAccountId(email);

        System.out.println(account_id);

        return authentication;
    }

    @GetMapping("/compare-dates")
    public String compareDates() {
        // upload date
        Map<String, Object> rec = recordingListService.getRecordingById(1);
        String uploadDate = rec.get("uploadDate").toString();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime uploadDateFormatted = LocalDateTime.parse(uploadDate, formatter);

        System.out.println("UPLOAD DATE FORMATTED " + uploadDateFormatted);

        //
        LocalDateTime dateTime1 = LocalDateTime.of(2023, 8, 31, 0, 0);

        boolean isBefore = dateTime1.isBefore(uploadDateFormatted);
        boolean isAfter = dateTime1.isAfter(uploadDateFormatted);

        return "isBefore: " + isBefore + "\nisAfter: " + isAfter;
    }

    @Override
    @PostMapping("analyzeLambda")
    public ResponseEntity<String> apply(@RequestBody List<Integer> ids){
        try {
            return recordingService.analyze(ids);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.ok("Error");
        }
    }
}
