package com.example.fyp.controller.dto;

import java.sql.Date;

import lombok.Data;

// DTO (Data Transfer Object) class
@Data
public class CardDto {
    
    private String cardholderName;
    private String cardNumber;
    private Date expiryDate;
    private String securityCode;
}
