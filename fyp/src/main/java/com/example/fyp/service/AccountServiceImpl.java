package com.example.fyp.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.fyp.controller.dto.AccountRegistrationDto;
import com.example.fyp.dao.RoleDao;
import com.example.fyp.dao.AccountDao;
import com.example.fyp.entity.Account;
import com.example.fyp.entity.Role;
import com.example.fyp.repo.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private RoleDao roleDao;

    @Override
    public Account save(AccountRegistrationDto registrationDto) {

        Role roles = new Role();
        roles.setName("ROLE_FREE");

        String password = registrationDto.getPassword();
        String hashedPW = passwordEncoder.encode((password));
        
        Account acc = new Account(registrationDto.getEmail(), registrationDto.getFullName(),
                                    hashedPW, Arrays.asList(roles)) ;

        return accountRepository.save(acc);
    }

    @Override
    public Account findUserByEmail(String email) {
        
        return accountDao.findUserByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        Account acc = accountDao.findUserByEmail(email);
        

        if (acc != null) {

            return new org.springframework.security.core.userdetails.User(acc.getEmail(), acc.getPassword(), mapRolesToAuthorities(acc.getRoles()));
        }
        else {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        
    }

    private Collection <? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {

        return roles.stream()
                    .map(role -> new SimpleGrantedAuthority(role.getName()))
                    .collect(Collectors.toList());
    }

  
    
}