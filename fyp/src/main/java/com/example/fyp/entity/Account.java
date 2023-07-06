package com.example.fyp.entity;

import java.sql.Date;
import java.util.Collection;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
    private String email;
    private String fullName;
    private String password;
    private String gender;
    private String phoneNum;
    private Date dob;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    // @JoinTable(name = "users_subs",
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_email", referencedColumnName = "email"),
            // inverseJoinColumns = @JoinColumn(name = "subs_id", referencedColumnName = "id"))   
            inverseJoinColumns = @JoinColumn(name = "roles_id", referencedColumnName = "id"))
    // private Collection<Subscription> subs;
    private Collection<Role> roles;

    public Account (String email, String fullName, String gender, String phoneNum, Date dob) {

        this.email = email;
        this.fullName = fullName;
        this.gender = gender;
        this.phoneNum = phoneNum;
        this.dob = dob;
    }
}