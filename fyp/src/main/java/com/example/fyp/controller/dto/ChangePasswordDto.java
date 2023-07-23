package com.example.fyp.controller.dto;

import lombok.Data;

@Data
public class ChangePasswordDto {
    
    String currentPassword;
    String newPassword;
    String confirmPassword;
}
