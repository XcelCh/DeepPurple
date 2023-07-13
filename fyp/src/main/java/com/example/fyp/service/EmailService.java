package com.example.fyp.service;

import java.io.UnsupportedEncodingException;

import com.example.fyp.controller.dto.EmailDetailsDto;
import com.example.fyp.entity.Account;

import jakarta.mail.MessagingException;

public interface EmailService {

    String sendSimpleMail (EmailDetailsDto emailDetailsDto);

    String sendMailWithAttachment (EmailDetailsDto emailDetailDto);

    void sendOTPEmail(Account account, String otp) throws UnsupportedEncodingException, MessagingException;
}
