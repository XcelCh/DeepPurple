package com.example.fyp.controller.dto;

import lombok.Data;

@Data
public class ChangeTranscriptDto {
    Integer transcriptId;
    Integer recordingId;
    String newTranscript;
}
