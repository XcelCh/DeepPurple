package com.example.fyp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Recording;

@Repository
public interface RecordingRepository extends JpaRepository<Recording, Integer>{
    
}
