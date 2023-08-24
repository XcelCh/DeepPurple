package com.example.fyp.controller.dto;

import java.util.List;

import lombok.Data;

@Data
public class AnalyzeRecordingDto {
    
    List<Integer> recordingList;
    Integer recordingId;
}
