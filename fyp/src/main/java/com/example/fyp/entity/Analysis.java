package com.example.fyp.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = "recording")
public class Analysis {   

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer analysisId;

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
    private String negativeEmotion;
    private String mainIssue;
    private double fluency;
    private double hospitality;
    private double problemSolving;
    private double personalization;
    private double averagePerformance;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "analysis", orphanRemoval = true)
    @JsonBackReference
    private List<Transcript> transcripts;

    @OneToOne
    @JoinColumn(name = "recording_id", referencedColumnName = "recordingId")
    @JsonManagedReference
    private Recording recording;
    
    @Override
    public String toString() {
        return "Analysis{analysisId=" + analysisId + ", category='" + category + '\'' + ", summary='" + summary + '\'' +
                ", employeeSpeakTime=" + employeeSpeakTime + ", customerSpeakTime=" + customerSpeakTime + ", silentTime=" + silentTime +
                ", customerSentiment='" + customerSentiment + '\'' + ", employeeSentiment='" + employeeSentiment + '\'' +
                ", recordingSentiment='" + recordingSentiment + '\'' + ", transcriptConfidence=" + transcriptConfidence +
                ", transcript=" + transcripts + ", recording=" + (recording != null ? recording.getRecordingId() : null) + '}';
    }

    public Analysis deleteAnalysis(List<Transcript> transcripts) {

        for (Transcript t : transcripts) {
            transcripts.remove(t);
            t.setAnalysis(null);
        }

        return this;
    }
}
