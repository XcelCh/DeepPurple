package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.example.fyp.entity.Employee;
import com.example.fyp.model.ResponseStatus;
import com.example.fyp.repo.EmployeeRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

// Debugging tools
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/employeeList")
public class EmployeeController {
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private EmployeeRepository empRepo;

    // Get All Employees
    @GetMapping("/getAllEmployees")
    public ResponseEntity<?> getAllEmployee() {
        ResponseStatus<List<Employee>> response = new ResponseStatus<>();

        try {
            List<Employee> empList = new ArrayList<>();
            empRepo.findAll().forEach(empList::add);

            if (empList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
    public ResponseEntity<?> deleteEmployeeById(@PathVariable Long id) {
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
    // @PostMapping("/updateEmployeeById/{id}"){

    // }

    // View Analysis Employee

}
