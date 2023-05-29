package com.example.fyp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.fyp.controller.dto.AccountRegistrationDto;
import com.example.fyp.service.AccountService;

@Controller
@RequestMapping("/signup")
public class AccountRegistrationController {

    @Autowired
    private AccountService accountService;

    @GetMapping
    public String showRegistrationForm(Model model) {
        model.addAttribute("account", new AccountRegistrationDto());
        return "registration";
    }

    @PostMapping
    public String registerUserAccount(@ModelAttribute ("account") AccountRegistrationDto registrationDto) {

        accountService.save(registrationDto);
        return "redirect:/signup?success";
    }
}