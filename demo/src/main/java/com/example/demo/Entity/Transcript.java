package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Transcript{
    @Id
    private Integer transcriptId;

    // @Id
    // @ManyToOne
    // @JoinColumn(name = "recording_id")
    // private Analysis analysis;

    private double startTime;
    private double endTime;
    private int employeeId;
    private int recordingId;

    @Column(columnDefinition = "TEXT")
    private String dialog;
}
