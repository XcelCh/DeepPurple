package com.example.demo.Entity;

import java.time.LocalDateTime;

import javax.sound.sampled.AudioFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;
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

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime uploadDate;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime recordingDate;
    
    private double recordingDuration;
    private String audioFormat;
    private Integer sampleRate;

    @Transient private AudioFormat format;
    
    @OneToOne(mappedBy = "recording", cascade = CascadeType.ALL, orphanRemoval = true)
    private Analysis analysis;
}