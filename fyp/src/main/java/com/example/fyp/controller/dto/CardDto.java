package com.example.fyp.controller.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
public class CardDto {
    
    private String cardholderName;

    private String cardNumber;

    private Date expiryDate;

    private String securityCode;
}
