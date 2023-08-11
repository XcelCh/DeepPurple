package com.example.fyp.entity;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Payment {
    
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    private String cardholderName;

    private String cardNumber;

    private Date expiryDate;

    @JsonProperty(access = Access.WRITE_ONLY)
    private String securityCode;

    private float usageLimit;


    
    @OneToMany(mappedBy = "payment")
    @JsonBackReference
    private List<Billing> billings;

    @JsonIgnore
    @OneToOne(mappedBy = "payment")
    @JsonManagedReference
    private Account account;
    
    @Override
    public String toString() {
        return "Payment{paymentId=" + paymentId + ", cardholderName='" + cardholderName + '\'' + ", cardNumber='" + cardNumber + '\'' +
               ", expiryDate=" + expiryDate + ", securityCode='" + securityCode + '\'' + 
               ", usageLimit=" + usageLimit +", accountId=" + account.getAccountId() + '}';
    }
}
