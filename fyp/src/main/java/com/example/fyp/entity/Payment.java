package com.example.fyp.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private String cardholderName;

    private String cardNumber;

    private Date expiryDate;

    private String securityCode;

    private float usageLimit;

    @OneToMany(mappedBy = "payment")
    private List<Billing> billings;

    @OneToOne(mappedBy = "payment")
    private Account account;
    
}
