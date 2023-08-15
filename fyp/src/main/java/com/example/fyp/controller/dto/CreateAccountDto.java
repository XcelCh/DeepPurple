package com.example.fyp.controller.dto;

import java.sql.Date;

import lombok.Data;

// DTO (Data Transfer Object) class
@Data
public class CreateAccountDto {
    
    private String email;
    private String fullName;
    private String gender;
    private Date dob;
    private String password;
    private String confirmPassword;
    private String phoneNum;
    private String companyField;
}
