package com.example.demo.DAO;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Analysis;

@Repository
public interface AnalysisDAO extends CrudRepository<Analysis, Integer>{
}
