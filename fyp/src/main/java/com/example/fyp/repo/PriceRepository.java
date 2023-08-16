package com.example.fyp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Price;

// Price Repository for Price Entity to access to the Database
@Repository
public interface PriceRepository extends JpaRepository<Price, Integer>{
    

}
