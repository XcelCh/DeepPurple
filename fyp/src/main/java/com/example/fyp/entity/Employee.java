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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "account")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employeeId;
    
    private String employeeName;
    private Integer numCallsHandled;
    private Integer numPositiveSentiment;
    private Integer numNegativeSentiment;
    
    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "accountId")
    @JsonManagedReference
    private Account account;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<Recording> recording;

    // Constructor
    public Employee (String employeeName){
        this.employeeName = employeeName;
    }

    @Override
    public String toString() {
        return "Employee{employeeId=" + employeeId + ", employeeName='" + employeeName + '\'' + ", numCallsHandled="
                + numCallsHandled +
                ", numPositiveSentiment=" + numPositiveSentiment + ", numNegativeSentiment=" + numNegativeSentiment +
                ", account=" + (account != null ? account.getAccountId() : null) +
                ", recording=" + recording + '}';
    }
    
    public void incrementNumCallsHandled() {
    	this.numCallsHandled++;
    }

    public void decrementNumCallsHandled() {
    	this.numCallsHandled--;
    }

    public Employee deleteEmployee(List<Recording> recordings) {

        for (Recording r : recordings) {
            r.deleteRecording(r.getAnalysis());
            recordings.remove(r);
            r.setEmployee(null);
        }

        return this;
    }

}
