package com.example.demo.DAO;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Recording;

@Repository
public interface RecordingDAO extends CrudRepository<Recording, Integer> {}