package com.example.demo.DAO;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Transcript;

@Repository
public interface TranscriptDAO  extends CrudRepository<Transcript, Integer> {}