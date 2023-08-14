package com.example.fyp.service;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.fyp.entity.Account;
import com.example.fyp.entity.Role;
import com.example.fyp.repo.AccountRepository;

@Service
public class AccountServiceImpl implements UserDetailsService, AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordResetTokenServiceImpl passwordResetTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        Account account = accountRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        
        System.out.println(account.getRoles());

        Collection<? extends GrantedAuthority> authorities = (mapRolesToAuthorities(account.getRoles()));

        return AccountDetailsImpl.build(account, authorities);
        
    }

    private Collection <? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {

        return roles.stream()
                    .map(role -> new SimpleGrantedAuthority(role.getName()))
                    .collect(Collectors.toList());
    }

    @Override
    public Account loadUserDetailsByUsername(String email) throws UsernameNotFoundException {

        Account account = accountRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return account;
    }

    @Override
    public void saveAccount(Account account) {

        Account savedAccount = accountRepository.save(account);
        System.out.println(savedAccount);
    }

    @Override
    public void generatePasswordResetToken (Account account, String passwordToken) {

        passwordResetTokenService.generatePasswordResetToken(account, passwordToken);

    }

    @Override
    public String validatePasswordResetToken (String passwordToken, String email) {

        return passwordResetTokenService.validatePasswordResetToken(passwordToken, email);
    }

    @Override
    public void changePassword (String email, String newPassword) {


        Account account = loadUserDetailsByUsername(email);
        account.setPassword(newPassword);

        accountRepository.save(account);
    }

    @Override
    public int getAccountId(String email) {

        return accountRepository.getAccountId(email);
    }

    @Override
    public void deleteAccount(Account account) {

        account.deleteAll(account.getUsageList(), account.getRecording(), account.getEmployee());
        accountRepository.deleteById(account.getAccountId());
    }


}