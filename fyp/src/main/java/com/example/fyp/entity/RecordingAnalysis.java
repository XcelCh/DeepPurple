package com.example.fyp.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Data;

@Data
@Entity
public class RecordingAnalysis {
    @Id 
    @OneToOne
    @JoinColumn(name = "recording_id")
    private Recording recording;

    private String category;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private double employeeSpeakTime;
    private double customerSpeakTime;
    private double silentTime;
    private String customerSentiment;
    private String employeeSentiment;
    private String recordingSentiment;
    private double transcriptConfidence;
    
    @OneToMany(mappedBy = "recordingAnalysis")
    private List<Transcript> transcripts;
}
