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

    // private Integer employeeId;
    // private Integer accountId;

    private String recordingName;
    
    @Nullable
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] content;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime uploadDate;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime recordingDate;

    @Nullable
    private double recordingDuration;

    @Nullable
    private String recordingUrl;

    private String audioFormat;
    private Integer sampleRate;
    
    @OneToOne(mappedBy = "recording", cascade = CascadeType.ALL)
    @JsonBackReference
    private Analysis analysis;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employeeId")
    @JsonManagedReference
    private Employee employee;

    @ManyToOne
    @JoinColumn(name ="account_id", referencedColumnName = "accountId")
    @JsonManagedReference
    private Account account;

    @Transient byte[] bytes;
    @Transient File tempFilePath;
    @Transient AudioFormat format;

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

    @Override
    public String toString() {
        return "Recording{recordingId=" + recordingId + ", recordingName='" + recordingName + '\'' + ", content=" + Arrays.toString(content) +
                ", uploadDate=" + uploadDate + ", recordingDate=" + recordingDate + ", recordingDuration=" + recordingDuration +
                ", recordingUrl='" + recordingUrl + '\'' + ", audioFormat='" + audioFormat + '\'' + ", sampleRate=" + sampleRate +
                ", analysis=" + (analysis != null ? analysis.getAnalysisId() : null) + ", employee=" + (employee != null ? employee.getEmployeeId() : null) +
                ", account=" + (account != null ? account.getAccountId() : null) + '}';
    }
}