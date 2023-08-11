package com.example.fyp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.example.fyp.entity.Account;
import com.example.fyp.entity.Employee;
import com.example.fyp.entity.Recording;
import com.example.fyp.model.ResponseStatus;
import com.example.fyp.repo.EmployeeRepository;
import com.example.fyp.service.RecordingListService;

import jakarta.persistence.EntityExistsException;

import com.example.fyp.repo.AccountRepository;
import com.example.fyp.repo.AudioFileRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.fyp.service.AccountServiceImpl;
import com.example.fyp.service.EmployeeService;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

// Debugging tools
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/employeeList")
public class EmployeeController {
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    // @Autowired
    // private AccountRepository accountRepository;

    @Autowired
    private AccountServiceImpl accountServiceImpl;
    
    @Autowired
    private EmployeeRepository empRepo;

    @Autowired
    private AudioFileRepository recRepo;

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Get All Employees
    @GetMapping("/getAllEmployees")
    public ResponseEntity<?> getAllEmployee(@RequestParam(required = false) String search) {
        ResponseStatus<List<Map<String, Object>>> response = new ResponseStatus<>();

        try {
            // Retrieve the current authentication token
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            System.out.println("EMAIL " + email);
            Integer account_id = accountServiceImpl.getAccountId(email);

            List<Map<String, Object>> empList = employeeService.getAllEmployee(account_id);

            if (search != null && !search.isEmpty()) {
                String searchKeyword = "%" + search.toLowerCase() + "%";

                empList = empList.stream()
                        .filter(emp -> ((String) emp.get("employeeName")).contains(search))
                        .collect(Collectors.toList());
            }

            // RESPONSE DATA
            response.setSuccess(true);
            response.setData(empList);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception ex) {
            ex.printStackTrace();
            
            // RESPONSE DATA
            response.setSuccess(false);
            response.setMessage("Failed to get All Employees.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Add Employee
    @PostMapping("/addEmployee")
    public ResponseEntity<?> addEmployee(@RequestBody String empName) {
        ResponseStatus<Employee> response = new ResponseStatus<>();

        try {
            // Retrieve the current authentication token
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            Account account = accountServiceImpl.loadUserDetailsByUsername(email);

            Employee emp = new Employee(empName);
            emp.setAccount(account);
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
            // System.out.println(id);
            empRepo.deleteById(id);
            // int result = employeeService.deleteEmployeeById(id);

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
        System.out.println("OLD EMP DATA: " + oldEmpData);

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
            recRepo.findByEmployee_EmployeeId(id).forEach(recList::add);

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
