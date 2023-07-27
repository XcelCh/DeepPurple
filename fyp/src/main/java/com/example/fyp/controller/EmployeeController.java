package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.example.fyp.entity.Employee;
import com.example.fyp.entity.Recording;
import com.example.fyp.model.ResponseStatus;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.repo.AudioFileRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// Debugging tools
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/employeeList")
public class EmployeeController {
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private EmployeeRepository empRepo;

    @Autowired
    private AudioFileRepository recRepo;

    // Get All Employees
    @GetMapping("/getAllEmployees")
    public ResponseEntity<?> getAllEmployee(@RequestParam(required = false) String search) {
        ResponseStatus<List<Employee>> response = new ResponseStatus<>();

        try {
            List<Employee> empList = new ArrayList<>();
            empRepo.findAll().forEach(empList::add);

            if (search != null && !search.isEmpty()){
                String searchKeyword = "%" + search + "%";
                empList = empList.stream()
                .filter(emp -> emp.getEmployeeName().toLowerCase().contains(search.toLowerCase()))
                        .collect(Collectors.toList());
            }

            // RESPONSE DATA
            response.setSuccess(true);
            response.setData(empList);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception ex) {
            // RESPONSE DATA
            response.setSuccess(false);
            response.setMessage("Fail to get All Employees.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Add Employee
    @PostMapping("/addEmployee")
    public ResponseEntity<?> addEmployee(@RequestBody Employee emp) {
        ResponseStatus<Employee> response = new ResponseStatus<>();

        try {
            Employee empObj = empRepo.save(emp);

            // RESPONSE DATA
            response.setSuccess(true);
            response.setData(empObj);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception ex) {
            // RESPONSE DATA
            response.setSuccess(false);
            response.setMessage("Fail to add employee.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

    // Delete Employee
    @DeleteMapping("/deleteEmployeeById/{id}")
    public ResponseEntity<?> deleteEmployeeById(@PathVariable Integer id) {
        ResponseStatus response = new ResponseStatus();

        try {
            empRepo.deleteById(id);

            // RESPONSE DATA
            response.setSuccess(true);
            response.setMessage("Employee with Id " + id + " is successfully deleted.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
            
        } catch (EmptyResultDataAccessException ex) {
            // RESPONSE DATA
            response.setSuccess(false);
            response.setMessage("Fail to delete Employee with Id " + id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    // Update Employee Name by Id
    @PostMapping("/updateEmployeeNameById/{id}")
    public ResponseEntity<?> updateEmpNameById(@PathVariable Integer id, @RequestBody Employee newEmpData)
    {
        ResponseStatus response = new ResponseStatus();
        Optional<Employee> oldEmpData = empRepo.findById(id);

        if (oldEmpData.isPresent()) {
            Employee updatedEmpData = oldEmpData.get();
            updatedEmpData.setEmployeeName(newEmpData.getEmployeeName());

            Employee empObj = empRepo.save(updatedEmpData);

            // RESPONSE DATA
            response.setSuccess(true);
            response.setMessage("Successfully change the name to " + newEmpData.getEmployeeName());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        // RESPONSE DATA
        response.setSuccess(false);
        response.setMessage("Fail to change the name to " + newEmpData.getEmployeeName());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // View Recording List of the Employee
    @GetMapping("/getEmployeeRecording/{id}")
    public ResponseEntity<?> getEmployeeRecordingList(@PathVariable Integer id, @RequestParam(required = false) String search) {
        ResponseStatus<List<Recording>> response = new ResponseStatus<>();

        try {
            List<Recording> recList = new ArrayList<>();
            recRepo.findByEmployeeId(id).forEach(recList::add);

             if (search != null && !search.isEmpty()){
                String searchKeyword = "%" + search + "%";
                recList = recList.stream()
                .filter(rec -> rec.getRecordingName().toLowerCase().contains(search.toLowerCase()))
                        .collect(Collectors.toList());
            }

            // RESPONSE DATA
            response.setSuccess(true);
            response.setData(recList);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception ex) {
            // RESPONSE DATA
            response.setSuccess(false);
            response.setMessage("Fail to get All Employees.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Get Employee Detail
    @GetMapping("/getEmployeeDetail/{id}")
    public ResponseEntity<?> getEmployeeDetail(@PathVariable Integer id) {
        ResponseStatus<Optional<Employee>> response = new ResponseStatus<>();

        try {
            Optional<Employee> emp = empRepo.findById(id);

            // RESPONSE DATA
            response.setSuccess(true);
            response.setData(emp);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception ex) {
            // RESPONSE DATA
            response.setSuccess(false);
            response.setMessage("Fail to get All Employees.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


}
