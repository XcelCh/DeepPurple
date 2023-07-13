package com.example.fyp.service;

import java.io.File;
import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.fyp.controller.dto.EmailDetailsDto;
import com.example.fyp.entity.Account;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public String sendSimpleMail(EmailDetailsDto emailDetailsDto) {
       
        try  {

            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(emailDetailsDto.getRecipient());
            mailMessage.setText(emailDetailsDto.getMsgBody());
            mailMessage.setSubject(emailDetailsDto.getSubject());

            javaMailSender.send(mailMessage);

            return "Mail Sent Succesfully";
        }
        catch (Exception e) {

            return "Error while Sending Mail" + e;
        }
    }

    @Override
    public String sendMailWithAttachment(EmailDetailsDto emailDetailDto) {
       
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try {

            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(emailDetailDto.getRecipient());
            mimeMessageHelper.setText(emailDetailDto.getMsgBody(), true);
            mimeMessageHelper.setSubject(emailDetailDto.getSubject());

            if (emailDetailDto.getAttachment() != null) {

                FileSystemResource file = new FileSystemResource(new File(emailDetailDto.getAttachment()));

                mimeMessageHelper.addAttachment(file.getFilename(), file);
            }

            javaMailSender.send(mimeMessage);

            return "Mail Sent Successfully";
        }
        catch (Exception e) {

            return "Error while Sending Mail" + e;
        }
    }

    @Override
    public void sendOTPEmail (Account account, String otp) throws UnsupportedEncodingException, MessagingException {

        EmailDetailsDto emailDetailsDto = new EmailDetailsDto();

        String subject = "Password Reset OTP";
        // String senderName = "DeepPurple";
        String mailContent= "<p> Hi, " + account.getFullName() + "</p>" +
                            "<p> To authenticate, please use the following One Time Password (OTP): </p>"+
                            "<p style='font-size:18px; font-weight:bold;'>" +otp +"</p>" +
                            "<p> Don't share this OTP with anyone. Our customer service team will never ask you for your password, OTP, credit card, or banking info.</p>" +
                            "<p> We hope to see you again soon.</p>";


        emailDetailsDto.setMsgBody(mailContent);
        emailDetailsDto.setSubject(subject);
        emailDetailsDto.setRecipient(account.getEmail());

        System.out.println(sendMailWithAttachment(emailDetailsDto));
        
    }
    
    
}
