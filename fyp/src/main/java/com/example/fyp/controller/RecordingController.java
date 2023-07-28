package com.example.fyp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.example.fyp.model.ResponseStatus;
import com.example.fyp.entity.Employee;
import com.example.fyp.entity.Recording;

@RestController
@RequestMapping("/recordingList")
public class RecordingController {
    @Autowired
    private AudioFileRepository recRepo;
 
    // Get All Recordings
    @GetMapping("/getAllRecordings")
    public ResponseEntity<?> getAllRecording(@RequestParam(required = false) String search) {
        ResponseStatus<List<Recording>> response = new ResponseStatus<>();

        try {
            List<Recording> recList = new ArrayList<>();
            recRepo.findAll().forEach(recList::add);

            if (search != null && !search.isEmpty()) {
                String searchKeyword = "%" + search + "%";
                recList = recList.stream()
                        .filter(rec -> rec.getRecordingName().toLowerCase().contains(search.toLowerCase()))
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

}
