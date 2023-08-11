package com.example.fyp.service;

import com.example.fyp.repo.EmployeeRepository;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Map<String, Object>> getAllEmployee(Integer account_id) {
      return employeeRepository.getAllEmployee(account_id);
    }
    
    public int deleteEmployeeById(Integer emp_id){
      return employeeRepository.deleteEmployeeById(emp_id);
    }
}
