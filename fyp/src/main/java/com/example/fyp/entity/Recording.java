package com.example.fyp.entity;

import java.time.LocalDateTime;
import java.util.List;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Recording {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recordingId;

    private Integer employeeId;

    // @ManyToOne
    // @JoinColumn(name = "employee_id")
    // private Employee employee;

    private String recordingName;
    
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] content;
    // @Lob
    // @Column(name = "content",length = 100000)
    // private byte[] audioData;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime uploadDate;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime recordingDate;

    @Nullable
    private double recordingDuration;

    private String audioFormat;
    private Integer sampleRate;
    
    // @OneToOne(mappedBy = "recording", cascade = CascadeType.ALL, orphanRemoval = true)
    // private Analysis analysis;

}