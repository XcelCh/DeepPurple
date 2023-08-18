package com.example.fyp.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.example.fyp.entity.Account;
import com.example.fyp.entity.Recording;
import com.example.fyp.repo.RecordingRepository;
import com.example.fyp.repo.TranscriptRepository;

//Service class to synchronise between DeepPurple DB and remote AWS S3 DB, to store file blobs.
@Service
public class StorageService {
	@Autowired
    private RecordingRepository repository;

	@Autowired
	private TranscriptRepository transcriptRepository;

    @Value("${application.bucket.name}")
	private String bucketName;

    @Autowired
	private AmazonS3 s3Client;

	//upload file
    public String uploadFile(MultipartFile file, Account account) {    	    	    	
    	File fileObj = convertMultiPartFileToFile(file);
    	long uniqueIdentifier = System.currentTimeMillis();
    	String fileName = file.getOriginalFilename();
    	s3Client.putObject(new PutObjectRequest(bucketName, (uniqueIdentifier+"_"+fileName), fileObj));
    	fileObj.delete();
    	
    	Recording audio = repository.save(Recording.builder()
    			.timeStamp(uniqueIdentifier)
    			.recordingName(fileName)
    			.uploadDate(LocalDateTime.now())
                .recordingDate(LocalDateTime.now())
                .account(account)
                .sampleRate(0)
    			.recordingUrl(s3Client.getUrl(bucketName, fileName).toString()).build());    			
    	return "File uploaded : " + fileName;
    }
    
	//download file from S3 (get and read object's byte content)
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
    
    //Convert from a S3 object instance to a file
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
    
	//Delete a file in S3
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

	public List<Object[]> getTranscriptsByAnalysisId(Integer analysisId) {

        return transcriptRepository.findEmployeeAndDialogByAnalysisId(analysisId);
	}

}
