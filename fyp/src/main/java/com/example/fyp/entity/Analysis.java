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

// Analysis Entity to store analysis data from GPT
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

    @Column(columnDefinition = "TEXT")
    private String negativeEmotion;
    private String mainIssue;
    private double fluency;
    private double hospitality;
    private double problemSolving;
    private double personalization;
    private double averagePerformance;
    
    // OneToMany relationship with Transcript Entity
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "analysis", orphanRemoval = true)
    @JsonBackReference
    private List<Transcript> transcripts;

    // OneToOne relationship with Recording Entity
    @OneToOne
    @JoinColumn(name = "recording_id", referencedColumnName = "recordingId")
    @JsonManagedReference
    private Recording recording;
    
    // To String method of Analysis Entity
    @Override
    public String toString() {
        return "Analysis{analysisId=" + analysisId + ", category='" + category + '\'' + ", summary='" + summary + '\'' +
                ", employeeSpeakTime=" + employeeSpeakTime + ", customerSpeakTime=" + customerSpeakTime + ", silentTime=" + silentTime +
                ", customerSentiment='" + customerSentiment + '\'' + ", employeeSentiment='" + employeeSentiment + '\'' +
                ", recordingSentiment='" + recordingSentiment + '\'' + ", transcriptConfidence=" + transcriptConfidence +
                ", transcript=" + transcripts + ", recording=" + (recording != null ? recording.getRecordingId() : null) + '}';
    }

    // Delete Function where deleting analysis will remove related entity such as Transcript
    // public Analysis deleteAnalysis() {

    //     for (Transcript t : this.transcripts) {
    //         this.transcripts.remove(t);
    //         t.setAnalysis(null);
    //     }

    //     return this;
    // }
}
