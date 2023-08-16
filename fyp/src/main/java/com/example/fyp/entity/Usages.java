package com.example.fyp.entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"billing", "account"})
public class Usages {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usagesId;

    private double minutesUsed;
    private double rate;
    private Date usageDate;
    
    @ManyToOne
    @JoinColumn(name = "billing_id")
    @JsonManagedReference
    private Billing billing;
    
    @ManyToOne
    @JoinColumn(name = "account_id")
    @JsonManagedReference
    private Account account;

    @Override
    public String toString() {
        return "Usages{usagesId=" + usagesId + ", minutesUsed=" + minutesUsed + ", rate=" + rate + ", usageDate=" + usageDate +
                ", billing=" + (billing != null ? billing.getBillingId() : null) + ", account=" + (account != null ? account.getAccountId() : null) +
                '}';
    }
}
