package com.example.fyp.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.example.fyp.entity.Recording;
import com.example.fyp.repo.AudioFileRepository;
import com.example.fyp.utils.AudioUtils;

import okio.Path;

@Service
public class StorageService {
	@Autowired
    private AudioFileRepository repository;

    @Value("${application.bucket.name}")
	private String bucketName;

    @Autowired
	private AmazonS3 s3Client;

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
    
    public String uploadFile(MultipartFile file) {
    	File fileObj = convertMultiPartFileToFile(file);
    	String fileName = System.currentTimeMillis()+"_"+file.getOriginalFilename();
    	s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
    	fileObj.delete();
    	
    	Recording audio = repository.save(Recording.builder()
    			.recordingName(fileName)
    			.uploadDate(LocalDateTime.now())
                .recordingDate(LocalDateTime.now())
                .sampleRate(0)
    			.recordingUrl(s3Client.getUrl(bucketName, fileName).toString()).build());    			
    	return "File uploaded : " + fileName;
    }
    
    public byte[] downloadFile(String fileName) {
    	S3Object s3Object = s3Client.getObject(bucketName, fileName);    	
    	S3ObjectInputStream inputStream = s3Object.getObjectContent();    	
    	try {
    		byte[] content = IOUtils.toByteArray(inputStream);
    		return content;
    	}catch(IOException e) {
    		e.printStackTrace();
    	}
    	return null;
    }
    
    
    public void readFromS3ObjectToFile(String fileName, String filePath) {    
    	S3Object s3Object = s3Client.getObject(bucketName, fileName);
    	InputStream inputStream = s3Object.getObjectContent();    	
    	try {
    		File tmp = File.createTempFile("test", "");
    		Files.copy(inputStream, tmp.toPath(), StandardCopyOption.REPLACE_EXISTING);
    	}catch(IOException e) {
    		e.printStackTrace();
    	}
    }
    
    public String deleteFile(String fileName) {
    	s3Client.deleteObject(bucketName, fileName);
    	return fileName + " removed.";
    }
    
    private File convertMultiPartFileToFile(MultipartFile file) {
    	File convertedFile = new File(file.getOriginalFilename());
    	try(FileOutputStream fos = new FileOutputStream(convertedFile)) {
    		fos.write(file.getBytes());
    	}catch(IOException e) {
    		System.out.println("Error converting multipartfile to file" + e);
    	}
    	
    	return convertedFile;
    }
}
