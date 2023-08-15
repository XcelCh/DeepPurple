package com.example.fyp.controller.dto;

import lombok.Data;

// DTO (Data Transfer Object) class
@Data
public class ChangePasswordDto {
    
    String currentPassword;
    String newPassword;
    String confirmPassword;
}
