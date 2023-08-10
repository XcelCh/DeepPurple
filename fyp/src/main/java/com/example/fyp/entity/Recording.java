package com.example.fyp.entity;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "analysis_id", referencedColumnName = "analysisId")
    @JsonManagedReference
    private Analysis analysis;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employeeId")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name ="account_id", referencedColumnName = "accountId")
    private Account account;


    @Override
    public String toString() {
        return "Recording{recordingId=" + recordingId + ", recordingName='" + recordingName + '\'' + ", content=" + Arrays.toString(content) +
                ", uploadDate=" + uploadDate + ", recordingDate=" + recordingDate + ", recordingDuration=" + recordingDuration +
                ", recordingUrl='" + recordingUrl + '\'' + ", audioFormat='" + audioFormat + '\'' + ", sampleRate=" + sampleRate +
                ", analysis=" + (analysis != null ? analysis.getAnalysisId() : null) + ", employee=" + (employee != null ? employee.getEmployeeId() : null) +
                ", account=" + (account != null ? account.getAccountId() : null) + '}';
    }
}