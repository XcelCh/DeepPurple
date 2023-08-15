package com.example.fyp.entity;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

// Billing Entity
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "payment")
public class Billing {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billingId;

    private float totalAmount;
    private Date dateBilled;

    // ManyToOne relationship with Payment Entity
    @ManyToOne
    @JoinColumn(name = "payment_id", referencedColumnName = "paymentId")
    @JsonManagedReference
    private Payment payment;

    // OneToMany relationship with Usages Entity
    @OneToMany(mappedBy = "billing", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Usages> usageList;

    // Custom Constructor for Billing Entity
    public Billing (float totalAmount, Date dateBilled, Payment payment, List<Usages> usageList) {
        this.totalAmount = totalAmount;
        this.dateBilled = dateBilled;
        this.payment = payment;
        this.usageList = usageList;
    }

    // ToString method for Billing Entity
    @Override
    public String toString() {
        return "Billing{billingId=" + billingId + ", totalAmount=" + totalAmount + ", dateBilled=" + dateBilled +
                ", payment=" + (payment != null ? payment.getPaymentId() : null) + '}';
    }
}
