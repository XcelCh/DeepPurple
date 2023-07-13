package com.example.fyp.controller.dto;

import lombok.Data;

@Data
public class PasswordResetRequestDto {
    
    private String email;
    private String newPassword;
    private String otp;
}
