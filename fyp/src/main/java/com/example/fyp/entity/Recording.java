package com.example.fyp.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Recording {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recordingId;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private String recordingName;
    
    @Lob
    private byte[] content;

    private LocalDateTime uploadDate;
    private LocalDateTime recordingDate;
    private double recordingDuration;
    private String audioFormat;
    private Integer sampleRate;
    
    @OneToOne(mappedBy = "recording", cascade = CascadeType.ALL, orphanRemoval = true)
    private RecordingAnalysis recordingAnalysis;

}
