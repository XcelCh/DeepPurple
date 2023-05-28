package com.example.fyp.dao;

import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Account;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Repository
public class AccountDaoImpl implements AccountDao {
    
    private EntityManager entityManager;


    @Override
    public Account findUserByEmail(String email) {
        
        TypedQuery<Account> theQuery = entityManager.createQuery("from Account where email=:uName", Account.class);
        theQuery.setParameter("uName", email);

        Account theAccount = null;

        try {
            theAccount = theQuery.getSingleResult();
            
        } catch (Exception e) {
            theAccount = null;
        }

        return theAccount;
    }
    
}
