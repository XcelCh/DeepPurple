package com.example.fyp.repo;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.fyp.controller.dto.EmployeeAnalysisDto;
import com.example.fyp.entity.Employee;

// Employee Repository for Employee Entity to access the database
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query("SELECT e.employeeName FROM Employee e WHERE e.employeeId = :employeeId")
    String findEmployeeNameById(Integer employeeId);    

    @Query("SELECT e.employeeId, e.employeeName FROM Employee e")
    List<Object[]> findAllEmployeeName();

    @Query("SELECT e.employeeName, e.numPositiveSentiment, e.numNegativeSentiment FROM Employee e ORDER BY e.numPositiveSentiment DESC LIMIT 5")
    List<Object[]> findTop5EmployeesByPositiveSentiment();

    @Query("SELECT e.employeeName, e.numPositiveSentiment, e.numNegativeSentiment FROM Employee e ORDER BY e.numNegativeSentiment DESC LIMIT 5")
    List<Object[]> findTop5EmployeesByNegativeSentiment();

    @Query("SELECT e.numPositiveSentiment, e.numNegativeSentiment FROM Employee e WHERE e.employeeId = :employeeId")
    Object[] findEmployeeSentimentById(Integer employeeId);

    @Query("SELECT e.employeeName AS employeeName, e.employeeId AS employeeId, e.numPositiveSentiment AS numPositiveSentiment, e.numNegativeSentiment AS numNegativeSentiment, e.numCallsHandled AS numCallsHandled FROM Employee e WHERE e.account.accountId = :account_id")
    List<Map<String, Object>> getAllEmployee(Integer account_id);
   
    Optional<Employee> findByEmployeeName(String employeeName);
    
    @Query("SELECT COUNT(e.employeeId) FROM Employee e WHERE e.employeeName = :empName AND e.account.accountId = :accountId")
    Integer countEmployeeByName(String empName, Integer accountId);

    void deleteById(Integer id);

    @Query("SELECT e.employeeId, e.employeeName, e.numCallsHandled FROM Employee e WHERE e.account.accountId = :accountId")
    List<Object[]>findEmployeeByAccount(@Param("accountId") Integer accountId);

}
