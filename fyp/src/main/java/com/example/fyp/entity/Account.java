package com.example.fyp.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;

import org.jetbrains.annotations.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Account {  
    
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    @NotNull
    @Column(unique = true)
    private String email;
    private String fullName;

    private String password;
    private String gender;
    private String phoneNum;
    private Date dob;


    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_email", referencedColumnName = "email"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles = new ArrayList<>();

    private String profilePic;
    private String companyField;

    public Account (String email, String fullName, String gender, String phoneNum, Date dob) {

        this.email = email;
        this.fullName = fullName;
        this.gender = gender;
        this.phoneNum = phoneNum;
        this.dob = dob;
    }

    public void addRole (Role role) {
        this.roles.add(role);
    }
}