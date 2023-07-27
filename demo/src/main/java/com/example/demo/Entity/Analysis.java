package com.example.demo.Entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Analysis {   
    @Id
    private Integer recordingId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "recordingId")
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
    
    // @OneToMany(mappedBy = "analysis")
    // private List<Transcript> transcripts;

    public Analysis(String category, String summary) {
        this.category = category;
        this.summary = summary;
    }

}