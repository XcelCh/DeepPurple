package com.example.fyp.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.fyp.entity.Recording;
import com.example.fyp.repo.AudioFileRepository;
import com.example.fyp.utils.AudioUtils;

@Service
public class StorageService {
	@Autowired
    private AudioFileRepository repository;

    public String uploadImage(MultipartFile file) throws IOException {

        Recording audioData = repository.save(Recording.builder()
                .recordingName(file.getOriginalFilename())
                .uploadDate(LocalDateTime.now())
                .recordingDate(LocalDateTime.now())
                .sampleRate(0)
                .content(AudioUtils.compressAudio(file.getBytes())).build());
        if (audioData != null) {
            return "file uploaded successfully : " + file.getOriginalFilename();
        }
        return null;
    }

    public byte[] downloadImage(String fileName){
        Optional<Recording> dbAudioData = repository.findByRecordingName(fileName);
        byte[] audio=AudioUtils.decompressAudio(dbAudioData.get().getContent());
        return audio;
    }
}
