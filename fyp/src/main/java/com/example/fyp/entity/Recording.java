package com.example.fyp.entity;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Arrays;

import javax.sound.sampled.AudioFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

// Analysis Entity 
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(exclude = {"employee", "account"})
public class Recording {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recordingId;

    private String recordingName;
    
    @Nullable
    private Long timeStamp;
    
    // Not needed
    @Nullable
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] content;

    // upload date and recording date could only get the date the user last modified the audio
    // remove one of them
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime uploadDate;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime recordingDate;

    @Nullable
    private double recordingDuration;

    @Nullable
    private String recordingUrl;
    private String employeeName;
    private String audioFormat;
    private Integer sampleRate;
    
    // OneToOne relationship with Analysis Entity
    @OneToOne(mappedBy = "recording", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private Analysis analysis;

    // ManyToOne relationship with Employee Entity
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employeeId")
    @JsonManagedReference
    private Employee employee;

    // ManyToOne relationship with Account Entity
    @ManyToOne
    @JoinColumn(name ="account_id", referencedColumnName = "accountId")
    @JsonManagedReference
    private Account account;

    // Transient attributes which will not be store in database
    @Transient 
    byte[] bytes;

    @Transient 
    File tempFilePath;

    @Transient 
    AudioFormat format;

    // Display Format of the Recording which consist of its details
    public String displayFormat(){
        String endian;

        if (format.isBigEndian())
            endian = "Big endian";
        else
            endian = "Little endian";

        return String.format("Filename: %s%n" +
                             "Channel: %d%n" +
                             "Frame rate: %.1fhz%n" +
                             "Frame size: %d%n" +
                             "Sample rate: %.1fhz%n" +
                             "Sample size in bits: %d%n" +
                             "Encoding: %s%n" +
                             "Endianness: %s%n" +
                             "Length: %.2f%n", 
                             recordingName, format.getChannels(), format.getFrameRate(), format.getFrameSize(), 
                             format.getSampleRate(), format.getSampleSizeInBits(), format.getEncoding(), endian, recordingDuration);
    }

    // ToString method of Recording Entity
    @Override
    public String toString() {
        return "Recording{recordingId=" + recordingId + ", recordingName='" + recordingName + '\'' + ", content=" + Arrays.toString(content) +
                ", uploadDate=" + uploadDate + ", recordingDate=" + recordingDate + ", recordingDuration=" + recordingDuration +
                ", recordingUrl='" + recordingUrl + '\'' + ", audioFormat='" + audioFormat + '\'' + ", sampleRate=" + sampleRate +
                ", analysis=" + (analysis != null ? analysis.getAnalysisId() : null) + ", employee=" + (employee != null ? employee.getEmployeeId() : null) +
                ", account=" + (account != null ? account.getAccountId() : null) + '}';
    }

    // Delete method which deletes related entities 
    public Recording deleteRecording(Analysis analysis) {

        analysis.deleteAnalysis(analysis.getTranscripts());
        this.setAnalysis(null);
        analysis.setRecording(null);

        return this;
    }
}