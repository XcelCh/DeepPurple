package com.example.fyp.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.Data;

@Data
@Entity
public class Transcript {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transcriptId;

    // @Id
    // @ManyToOne
    // @JoinColumn(name = "recording_id")
    // private Analysis analysis;

    private double startTime;
    private double endTime;

    // private Integer employeeId;

    // private Integer recordingId;
    
    @Transient
    private String employeeName;

    @Column(columnDefinition = "TEXT")
    private String dialog;
    
    // public String getEmployeeName() {
    //     return employeeName;
    // }

    // public void setEmployeeName(String employeeName) {
    //     this.employeeName = employeeName;
    // }

    @ManyToOne
    @JoinColumn(name = "analysis_id", referencedColumnName = "analysisId")
    @JsonManagedReference
    private Analysis analysis;

    @Override
    public String toString() {
        return "Transcript{transcriptId=" + transcriptId + ", startTime=" + startTime + ", endTime=" + endTime +
                ", employeeName='" + employeeName + '\'' + ", dialog='" + dialog + '\'' +
                ", analysis=" + (analysis != null ? analysis.getAnalysisId() : null) +'}';
    }


}
