package com.example.fyp.controller.dto;

import lombok.Data;

// DTO (Data Transfer Object) class
@Data
public class LoginDto {
    private String email;
    private String password;
}