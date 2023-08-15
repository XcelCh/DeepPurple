package com.example.fyp.security;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Custom Access Denied Class to handle User with not specified roles
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler{

    private static final Logger logger = LoggerFactory.getLogger(CustomAccessDeniedHandler.class);

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) 
                                        throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        logger.error("Forbidden error: {}", accessDeniedException.getMessage());
    }
    
}
