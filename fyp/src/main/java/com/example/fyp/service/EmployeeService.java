package com.example.fyp.service;

import com.example.fyp.repo.EmployeeRepository;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Service Class for Employee Entity to communicate with database 
@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Get all employee associated with the accountId
    public List<Map<String, Object>> getAllEmployee(Integer account_id) {
      return employeeRepository.getAllEmployee(account_id);
    }
    
    // Delete Employee record with the specific ID
    public void deleteById(Integer emp_id){
       employeeRepository.deleteById(emp_id);
    }
    
    public boolean empIsExisted(String empName, Integer account_id) {
      if (employeeRepository.countEmployeeByName(empName, account_id) > 0){
        return true;
      }else{
        return false;
      }
    }
}
