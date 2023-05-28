package com.example.fyp.dao;

import com.example.fyp.entity.Account;

public interface AccountDao {
    
    public Account findUserByEmail(String email);
}
