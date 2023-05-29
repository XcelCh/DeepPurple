package com.example.fyp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
    
    @GetMapping ("/home")
    public String home() {

        return "home";
    }
}
