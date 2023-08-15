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

// PasswordResetToken Service Class handles the communication with database and password reset related services
@Service
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    // Generate PasswordResetToken / OTP 
    @Override
    @Transactional
    public void generatePasswordResetToken (Account account, String passwordToken) {

        PasswordResetToken passwordResetToken = new PasswordResetToken(passwordToken, account);

        // Delete expired OTP / Password Token associated with specified Account and save the new token
        deleteExpiredPasswordToken(account);
        passwordResetTokenRepository.save(passwordResetToken);
    }

    // Delete Expired Password Token
    @Override
    public void deleteExpiredPasswordToken (Account account) {

        Date now = new Date();

        // Calculate the expired time by NOW and delete by expired time, 
        // Additionally delete by the account that request it again to invalidate the previous token
        Date deletionTime = new Date(now.getTime() - 10 * 60 * 1000);
        passwordResetTokenRepository.deleteByExpirationTimeLessThan(deletionTime);
        passwordResetTokenRepository.deleteByAccount(account);
    }

    // Validate the Password Token entered by user against the database
    @Override
    public String validatePasswordResetToken(String passwordToken, String email) throws EntityNotFoundException {

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(passwordToken)
                                                .orElseThrow(() -> new EntityNotFoundException("Invalid Token:" + passwordToken));

        Account account = passwordResetToken.getAccount();

        // Check if the OTP entered is associated with the Account it sends to
        if (!(account.getEmail().equals(email))) {
            
            return "Email does not match.";
        }

        // Check for Expiration of the token
        Calendar calendar = Calendar.getInstance();
        if ((passwordResetToken.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {

            return "expired";
        }
        return "valid";
    }

    // Find the Account associated with the Password Token
    @Override
    public Account findAccountByToken(String passwordToken) {

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(passwordToken)
                                                .orElseThrow(() -> new EntityNotFoundException("Invalid Token:" + passwordToken));

        return (passwordResetToken.getAccount());
    }
}
