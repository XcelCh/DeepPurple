package com.example.fyp.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import lombok.Data;

@Data
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employeeId;
    
    // private Integer accountId;
    
    private String employeeName;
    private Integer numCallsHandled;
    private Integer numPositiveSentiment;
    private Integer numNegativeSentiment;


    // @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<Recording> recordings;

    // public void setAccountId(Integer accountId){
    //     this.accountId = accountId;
    // }

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "accountId")
    @JsonManagedReference
    private Account account;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Recording> recording;

    @Override
    public String toString() {
        return "Employee{employeeId=" + employeeId + ", employeeName='" + employeeName + '\'' + ", numCallsHandled=" + numCallsHandled +
                ", numPositiveSentiment=" + numPositiveSentiment + ", numNegativeSentiment=" + numNegativeSentiment +
                ", account=" + (account != null ? account.getAccountId() : null) +
                ", recording=" + recording + '}';
    }

}
