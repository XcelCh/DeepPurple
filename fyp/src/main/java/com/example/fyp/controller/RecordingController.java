package com.example.fyp.controller;

import java.awt.SystemColor;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.entity.Account;
import com.example.fyp.entity.Analysis;
import com.example.fyp.entity.Employee;
import com.example.fyp.entity.Recording;
import com.example.fyp.model.ResponseStatus;
import com.example.fyp.repo.AnalysisRepository;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.service.AccountServiceImpl;
import com.example.fyp.service.RecordingListService;
import com.example.fyp.service.RecordingService;
import com.example.fyp.service.StorageService;
import com.example.fyp.service.UsageService;
import com.example.fyp.service.AnalysisService;

//Controller to handle existing recording files list
@RestController
@RequestMapping("/recordingList")
public class RecordingController {

    private final RecordingListService recordingListService;
    private final RecordingService recordingService;
    private final AccountServiceImpl accountServiceImpl;

    @Autowired
    public RecordingController(RecordingListService recordingListService, RecordingService recordingService,
            AccountServiceImpl accountServiceImpl) {
        this.recordingListService = recordingListService;
        this.recordingService = recordingService;
        this.accountServiceImpl = accountServiceImpl;
    }

    @Autowired
    private RecordingRepository recRepo;

    @Autowired
    private EmployeeRepository empRepo;

    @Autowired
    private AnalysisRepository analysisRepo;

    @Autowired
    private UsageService usageService;

    @Autowired
    private AnalysisService analysisService;

    @Autowired
    private StorageService storageService;

    // Get All Recordings and delete recordings that have null analysis
    @GetMapping("/getAllRecordings")
    public ResponseEntity<?> getAllRecording(@RequestParam(required = false) String search) {
        ResponseStatus<List<Map<String, Object>>> response = new ResponseStatus<>();

        try {
            // Retrieve the current authentication token
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            Integer account_id = accountServiceImpl.getAccountId(email);

            List<Map<String, Object>> recList = recordingListService.getRecordingList(account_id);

            // delete unanalyzed recordings
            Iterator<Map<String, Object>> iterator = recList.iterator();
            while (iterator.hasNext()) {
                Map<String, Object> recIter = iterator.next();
                Optional<Recording> r = recRepo.findById((Integer) recIter.get("recordingId"));
                if (r.get().getAnalysis() == null) {
                    r.get().getEmployee().decrementNumCallsHandled();
                    empRepo.save(r.get().getEmployee());
                    recRepo.delete(r.get());
                    storageService.deleteFile(r.get().getTimeStamp() + "_" + r.get().getRecordingName());
                    iterator.remove();
                }
            }

            if (search != null && !search.isEmpty()) {

                recList = recList.stream()
                        .filter(rec -> ((String) rec.get("recordingName")).toLowerCase().contains(search.toLowerCase()))
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
            // get recording sentiment
            Integer analysisId = analysisService.getAnalysisId(id);
            Analysis analysis = analysisRepo.findById(analysisId).get();
            String recordingSentiment = analysis.getRecordingSentiment();

            Optional<Recording> recToDelete = recRepo.findById(id);
            if (recToDelete.get().getEmployee() != null) {
                recToDelete.get().getEmployee().decrementNumCallsHandled();
                
                if (recordingSentiment.equals("Positive")) {
                    recToDelete.get().getEmployee().decrementNumPositiveSentiment();
                } else {
                    recToDelete.get().getEmployee().decrementNumNegativeSentiment();
                }

                empRepo.save(recToDelete.get().getEmployee());
            }

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

    // Update Recording's employee
    @PostMapping("/updateRecordingEmployeeById/{rec_id}")
    public ResponseEntity<?> updateEmpNameById(@PathVariable Integer rec_id, @RequestBody String new_emp_id) {
        ResponseStatus response = new ResponseStatus();

        // get recording sentiment
        Integer analysisId = analysisService.getAnalysisId(rec_id);
        Analysis analysis = analysisRepo.findById(analysisId).get();
        String recordingSentiment = analysis.getRecordingSentiment();

        // update recording
        Recording recording = recRepo.findById(rec_id).get();

        // update num calls handled
        Employee new_employee = empRepo.findById(Integer.parseInt(new_emp_id)).get();
        new_employee.setNumCallsHandled(new_employee.getNumCallsHandled() + 1);

        // If old employee is existed
        if (recording.getEmployee() != null) {
            Integer old_emp_id = recording.getEmployee().getEmployeeId();
            Employee old_employee = empRepo.findById(old_emp_id).get();
            old_employee.setNumCallsHandled(old_employee.getNumCallsHandled() - 1);

            if (recordingSentiment.equals("Positive")) {
                old_employee.setNumPositiveSentiment(old_employee.getNumPositiveSentiment() - 1);
            } else {
                old_employee.setNumNegativeSentiment(old_employee.getNumNegativeSentiment() - 1);
            }

        }

        // update number of employee recording sentiment
        if (recordingSentiment.equals("Positive")) {
            new_employee.setNumPositiveSentiment(new_employee.getNumPositiveSentiment() + 1);
        } else {
            new_employee.setNumNegativeSentiment(new_employee.getNumNegativeSentiment() + 1);
        }

        // update recording
        recording.setEmployee(new_employee);

        Recording recObj = recRepo.save(recording);

        // RESPONSE DATA
        response.setSuccess(true);
        response.setMessage("Succesfully change the employee to employee id " + new_emp_id);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // check if the recording analysis was successful, based on user's current usage
    // limit.
    @PostMapping("analyzeLambda")
    public ResponseEntity<String> apply(@RequestBody List<Integer> ids) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Account account = accountServiceImpl.loadUserDetailsByUsername(authentication.getName());

            Float limit = account.getPayment().getUsageLimit();
            Float totalUnbilled = usageService.getTotalUnbilledUsage(account.getAccountId());
            Float limitLeft = limit - totalUnbilled;

            boolean check = recordingService.checkLimit(ids, limitLeft, account);

            if (check == false) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Limit Exceeded");
            } else {
                return ResponseEntity.status(HttpStatus.OK).body("Analyze Complete");
            }
        }

        catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username not Found.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Cannot Process, "
                    + e);
        }
    }

}
