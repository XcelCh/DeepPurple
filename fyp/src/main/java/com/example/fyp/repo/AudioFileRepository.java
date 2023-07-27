package com.example.fyp.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fyp.entity.Recording;

import java.util.List;
import java.util.Optional;

public interface AudioFileRepository extends JpaRepository<Recording, Long> {

    Optional<Recording> findByRecordingName(String fileName);

    List<Recording> findByEmployeeId(Long employeeId);
}

