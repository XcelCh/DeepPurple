package com.example.fyp.controller.dto;

import lombok.Data;

// DTO (Data Transfer Object) class
@Data
public class PasswordResetRequestDto {
    
    private String email;
    private String newPassword;
    private String otp;
}
