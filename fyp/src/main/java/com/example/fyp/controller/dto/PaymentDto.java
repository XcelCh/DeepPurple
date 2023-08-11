package com.example.fyp.controller.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class PaymentDto {
    private String cardholderName;
    private String cardNumber;
    private Date expiryDate;
    private String securityCode;
}
