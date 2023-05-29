package com.example.fyp.security;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.example.fyp.service.AccountService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        
        http.authorizeHttpRequests(configurer -> 
                        configurer
                                .requestMatchers("/").permitAll()
                                .requestMatchers("/signup").permitAll()
                                .anyRequest().authenticated()
                )
                .formLogin(form ->
                            form
                                .loginPage("/login")
                                .loginProcessingUrl("/authenticateUser")
                                .permitAll()
                                .defaultSuccessUrl("/home", true)
                )
                .logout(logout -> logout.permitAll()
                );
        return http.build();
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    DaoAuthenticationProvider authenticationProvider(AccountService accountService) {

        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(accountService);
        auth.setPasswordEncoder(passwordEncoder());

        return auth;
    }

}