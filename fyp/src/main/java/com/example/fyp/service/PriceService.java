package com.example.fyp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Account;
import com.example.fyp.entity.Price;
import com.example.fyp.repo.PriceRepository;

// Service Class for Price Entity
@Service
public class PriceService {
    
    @Autowired
    PriceRepository priceRepository;
    
    // Get the current rate
    public double getPrice (Integer id) {

        Price price = priceRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("Price Not Found with id: " + id));

        return price.getPriceRate();
    }
}
