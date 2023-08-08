package com.example.fyp.entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Usages {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usagesId;

    private float minutesUsed;

    private float rate;

    private Date usageDate;

    @ManyToOne
    @JoinColumn(name = "billing_id")
    private Billing billing;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;
}
