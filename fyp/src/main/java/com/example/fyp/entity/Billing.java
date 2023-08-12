package com.example.fyp.entity;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Billing {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billingId;

    private float totalAmount;

    private Date dateBilled;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    @JsonManagedReference
    private Payment payment;

    @OneToMany(mappedBy = "billing")
    @JsonBackReference
    private List<Usages> usageList;

    public Billing (float totalAmount, Date dateBilled, Payment payment, List<Usages> usageList) {
        this.totalAmount = totalAmount;
        this.dateBilled = dateBilled;
        this.payment = payment;
        this.usageList = usageList;
    }

    @Override
    public String toString() {
        return "Billing{billingId=" + billingId + ", totalAmount=" + totalAmount + ", dateBilled=" + dateBilled +
                ", payment=" + (payment != null ? payment.getPaymentId() : null) + '}';
    }
}
