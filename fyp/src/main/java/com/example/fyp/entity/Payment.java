package com.example.fyp.entity;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

// Payment Entity
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "account")
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

    // OneToMany relationship with Billing Entity
    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Billing> billings;

    // OneToOne relationship with Account Entity
    @JsonIgnore
    @OneToOne(mappedBy = "payment")
    @JsonManagedReference
    private Account account;

    // Custom Constructor 
    public Payment (String cardholderName, String cardNumber, Date expiryDate, String securityCode) {

        this.cardholderName = cardholderName;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.securityCode = securityCode;
    }
    
    // ToString method for Payment Entity
    @Override
    public String toString() {
        return "Payment{paymentId=" + paymentId + ", cardholderName='" + cardholderName + '\'' + ", cardNumber='" + cardNumber + '\'' +
               ", expiryDate=" + expiryDate + ", securityCode='" + securityCode + '\'' + 
               ", usageLimit=" + usageLimit +", accountId=" + account.getAccountId() + '}';
    }
}
