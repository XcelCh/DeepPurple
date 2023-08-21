package com.example.fyp.security;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.example.fyp.security.jwt.AuthEntryPointJwt;
import com.example.fyp.security.jwt.AuthTokenValidationFilter;
import com.example.fyp.service.AccountServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

// Configuration class that controls the whole Security related to the web
@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {

    @Autowired
    AccountServiceImpl accountService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Autowired
    private CustomAccessDeniedHandler customAccessDeniedHandler;

    // Declare the JWT Validation filter as a bean
    @Bean
    public AuthTokenValidationFilter authenticationJwtTokenFilter() {
        return new AuthTokenValidationFilter();
    }

    // Declare DaoAuthenticationProvider as a bean use to validate username and password on login
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(accountService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    // Declare the authentication manager 
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // Declare the BCrypt Password Encoder use to encrypt password
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configure the web security method
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // CORS related configuration to allow communication from the frontend URL
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration config = new CorsConfiguration();
                        config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        // config.setAllowedOrigins(Collections.singletonList("https://frontend.d22e4ei8cn3no7.amplifyapp.com/"));
                        config.setAllowedMethods(Collections.singletonList("*"));
                        config.setAllowCredentials(true);
                        config.setAllowedHeaders(Collections.singletonList("*"));
                        config.setExposedHeaders(Arrays.asList("Authorization"));
                        config.setMaxAge(3600L);
                        return config;
                    }
                })) 
                // Set the exception handling of authentication failure or access denied to our custom class
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler)
                                                         .accessDeniedHandler(customAccessDeniedHandler))
                // Manage the session creation policy
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Configure the Http request that is authenticated or need specific roles
                .authorizeHttpRequests(auth -> auth
                        // Endpoints that can be access by all user
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/analyze").permitAll()
                        .requestMatchers("/sendInquiry").permitAll()

                        // Endpoints that can only be access by UNAUTHENTICATED user
                        .requestMatchers("/api/auth/**").anonymous()
                        .requestMatchers("/register/**").anonymous()

                        // Endpoints that can be access by AUTHENTICATED user
                        .requestMatchers("/profile/**").authenticated()
                        .requestMatchers("/starter/**").authenticated()
                        .requestMatchers("/payment/**").authenticated()
                        
                        // Endpoints that can be access by user that is AUTHENTICATED and Has Specific ROLE
                        .requestMatchers("/employeeList/**").hasRole("CARD")
                        .requestMatchers("/recordingList/**").hasRole("CARD")
                        .requestMatchers("/audio/**").hasRole("CARD")
                        .requestMatchers("/analysis/**").hasRole("CARD")
                        .requestMatchers("/summaryAnalysis/**").hasRole("CARD")
                        .requestMatchers("/check").hasRole("CARD")
                );

        // Set the authentiction provider
        http.authenticationProvider(authenticationProvider());
        // Add our custom filter into the filter chain
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
