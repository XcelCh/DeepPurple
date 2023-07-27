package com.example.fyp.repo;

import com.example.fyp.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

    @Query("SELECT e.employeeName FROM Employee e WHERE e.employeeId = :employeeId")
    String findEmployeeNameById(Integer employeeId);

}
