package com.example.fyp.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import io.micrometer.core.ipc.http.HttpSender.Response;

@RestController
public class CustomErrorController implements ErrorController{
    

    @GetMapping("/error")
    public ResponseEntity<String> handleError() {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }

}
