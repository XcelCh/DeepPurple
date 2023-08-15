package com.example.fyp.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

// Transcript Entity
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "analysis")
public class Transcript {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transcriptId;

    private double startTime;
    private double endTime;
    
    // Transient variable which will not be store in database
    @Transient
    private String employeeName;

    @Column(columnDefinition = "TEXT")
    private String dialog;

    private boolean speaker;
    
    // ManyToOne relationship with Analysis Entity
    @ManyToOne
    @JoinColumn(name = "analysis_id", referencedColumnName = "analysisId")
    @JsonManagedReference
    private Analysis analysis;

    // ToString method of Transcript Entity
    @Override
    public String toString() {
        return "Transcript{transcriptId=" + transcriptId + ", startTime=" + startTime + ", endTime=" + endTime +
                ", employeeName='" + employeeName + '\'' + ", dialog='" + dialog + '\'' +
                ", analysis=" + (analysis != null ? analysis.getAnalysisId() : null) +'}';
    }
}
