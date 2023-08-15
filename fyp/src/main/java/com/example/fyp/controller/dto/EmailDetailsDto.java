package com.example.fyp.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO (Data Transfer Object) class
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailDetailsDto {
    
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
}
