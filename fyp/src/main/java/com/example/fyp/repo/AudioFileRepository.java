package com.example.fyp.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fyp.entity.Recording;

import java.util.List;
import java.util.Optional;

// AudioFile Repository for AudioFile Entity to access to the Database
public interface AudioFileRepository extends JpaRepository<Recording, Integer> {

    Optional<Recording> findByRecordingName(String fileName);

    List<Recording> findByEmployee_EmployeeId(Integer employeeId);

    
}

