package com.example.fyp.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.jetbrains.annotations.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Create an entity Account
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Account {  
    

    // Attribute of the Account Entity
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    @NotNull
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String fullName;

    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String gender;
    
    @Column(nullable = false)
    private String phoneNum;

    @Column(nullable = false)
    private Date dob;

    // Join table of a ManyToMany relationship with Role Entity
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "account_id", referencedColumnName = "accountId"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles = new ArrayList<>();

    private String companyField;

    // A back reference of a OneToMany relationship between Usages Entity.
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<Usages> usageList;
    
    // A OneToOne relationship with Payment Entity.
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name= "payment_id", referencedColumnName = "paymentId", nullable = true)
    @JsonBackReference
    private Payment payment;

    // A back reference of a OneToMany relationship between Recording Entity.
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<Recording> recording;

    // A back reference of a OneToMany relationship between Employee Entity.
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<Employee> employee;

    // Custom Constructor to create an Account object
    public Account (String email, String fullName, String gender, String phoneNum, Date dob, String companyField) {

        this.email = email;
        this.fullName = fullName;
        this.gender = gender;
        this.phoneNum = phoneNum;
        this.dob = dob;
        this.companyField = companyField;
    }

    // Function to add Role object to the collection.
    public void addRole (Role role) {
        this.roles.add(role);
    }

    public void deleteRole(Role role) {
        this.roles.remove(role);
    }

    public void addUsage (Usages usage) {
        this.usageList.add(usage);
    }

    // To String Method of the Account
    @Override
    public String toString() {
        return "Account{accountId=" + accountId + ", email='" + email + '\'' + ", fullName='" + fullName + '\'' +
               ", gender='" + gender + '\'' + ", phoneNum='" + phoneNum + '\'' + ", dob=" + dob + ", roles=" + roles +
            //    ", profilePic='" + profilePic + '\'' + 
               ", companyField='" + companyField + '\'' + ", paymentId=" + (payment != null ? payment.getPaymentId() : null) + 
               ", recording=" + recording + ", employee=" + employee + '}' ;
    }
}