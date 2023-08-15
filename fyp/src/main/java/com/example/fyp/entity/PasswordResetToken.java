package com.example.fyp.entity;

import java.util.Calendar;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

// PasswordResetToken Entity
@Data
@NoArgsConstructor
@Entity
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long token_id;

    private String token;
    private Date expirationTime;
    private static final int EXPIRATION_TIME = 5;

    // OneToOne relationship with Account Entity
    @OneToOne
    @JoinColumn(name = "account_id")
    private Account account;

    // Custom Constructor for PasswordResetToken
    public PasswordResetToken(String token, Account account) {

        this.token = token;
        this.account = account;
        this.expirationTime = this.getTokenExpirationTime();
    }

    // Custom Constructor 
    public PasswordResetToken(String token) {

        this.token = token;
        this.expirationTime = this.getTokenExpirationTime();
    }

    // Method to return the token expiration time
    public Date getTokenExpirationTime() {

        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, EXPIRATION_TIME);

        return new Date(calendar.getTime().getTime());
    }
}
