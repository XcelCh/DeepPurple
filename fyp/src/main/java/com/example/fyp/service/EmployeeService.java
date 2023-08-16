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
    
    public void deleteById(Integer emp_id) {
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
