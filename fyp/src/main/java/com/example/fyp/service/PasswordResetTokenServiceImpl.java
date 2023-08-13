package com.example.fyp.service;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.fyp.entity.Account;
import com.example.fyp.entity.PasswordResetToken;
import com.example.fyp.repo.PasswordResetTokenRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Override
    @Transactional
    public void generatePasswordResetToken (Account account, String passwordToken) {

        PasswordResetToken passwordResetToken = new PasswordResetToken(passwordToken, account);

        deleteExpiredPasswordToken(account);
       
        passwordResetTokenRepository.save(passwordResetToken);
    }

    @Override
    public void deleteExpiredPasswordToken (Account account) {

        Date now = new Date();
        Date deletionTime = new Date(now.getTime() - 10 * 60 * 1000);
        passwordResetTokenRepository.deleteByExpirationTimeLessThan(deletionTime);
        passwordResetTokenRepository.deleteByAccount(account);
    }

    @Override
    public String validatePasswordResetToken(String passwordToken, String email) throws EntityNotFoundException {

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(passwordToken)
                                                .orElseThrow(() -> new EntityNotFoundException("Invalid Token:" + passwordToken));


        Account account = passwordResetToken.getAccount();

        if (!(account.getEmail().equals(email))) {
            
            return "Email does not match.";
        }

        Calendar calendar = Calendar.getInstance();
        if ((passwordResetToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {

            return "expired";
        }

        return "valid";
    }

    @Override
    public Account findAccountByToken(String passwordToken) {

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(passwordToken)
                                                .orElseThrow(() -> new EntityNotFoundException("Invalid Token:" + passwordToken));


        Account account = passwordResetToken.getAccount();

        return account;
    }


    
}
