package com.example.fyp.controller.dto;

import lombok.Data;

// DTO (Data Transfer Object) class
@Data
public class ChangeTranscriptDto {
    Integer transcriptId;
    Integer recordingId;
    String newTranscript;
}
