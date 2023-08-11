package com.example.fyp.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
public class Analysis {   

    @Id
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
    
    @OneToMany(mappedBy = "analysis", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Transcript> transcripts;

    @OneToOne(mappedBy = "analysis")
    @JsonBackReference
    private Recording recording;
    
    @Override
    public String toString() {
        return "Analysis{analysisId=" + analysisId + ", category='" + category + '\'' + ", summary='" + summary + '\'' +
                ", employeeSpeakTime=" + employeeSpeakTime + ", customerSpeakTime=" + customerSpeakTime + ", silentTime=" + silentTime +
                ", customerSentiment='" + customerSentiment + '\'' + ", employeeSentiment='" + employeeSentiment + '\'' +
                ", recordingSentiment='" + recordingSentiment + '\'' + ", transcriptConfidence=" + transcriptConfidence +
                ", transcript=" + transcripts + ", recording=" + (recording != null ? recording.getRecordingId() : null) + '}';
    }
}
