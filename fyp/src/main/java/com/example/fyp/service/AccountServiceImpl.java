package com.example.fyp.service;

import java.util.Collection;
import java.util.List;
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

// Implements the Account Service and UserDetailsService class to communicate with Account database and contains Account related functions
@Service
public class AccountServiceImpl implements UserDetailsService, AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordResetTokenServiceImpl passwordResetTokenService;

    // Load Account from database by email and build into AccountDetailsImpl object for authentication
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        Account account = accountRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        Collection<? extends GrantedAuthority> authorities = (mapRolesToAuthorities(account.getRoles()));

        return AccountDetailsImpl.build(account, authorities);
    }

    // Map Roles to SimpleGrantedAuthority for roles authentication in Springboot
    private Collection <? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {

        return roles.stream()
                    .map(role -> new SimpleGrantedAuthority(role.getName()))
                    .collect(Collectors.toList());
    }

    // Load Account details from database by email
    @Override
    public Account loadUserDetailsByUsername(String email) throws UsernameNotFoundException {

        Account account = accountRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return account;
    }

    // Save account into the database
    @Override
    public void saveAccount(Account account) {

        accountRepository.save(account);
    }

    // Generate password reset token / OTP using Account and passwordToken
    @Override
    public void generatePasswordResetToken (Account account, String passwordToken) {

        passwordResetTokenService.generatePasswordResetToken(account, passwordToken);
    }

    // Validate the password token / OTP with token associated with the email
    @Override
    public String validatePasswordResetToken (String passwordToken, String email) {

        return passwordResetTokenService.validatePasswordResetToken(passwordToken, email);
    }

    // Change password for the current Account 
    @Override
    public void changePassword (String email, String newPassword) {

        Account account = loadUserDetailsByUsername(email);
        account.setPassword(newPassword);
        accountRepository.save(account);
    }

    // Get AccountId from database
    @Override
    public int getAccountId(String email) {

        return accountRepository.getAccountId(email);
    }

    // Delete Account from database and all asoociated entities with the specific Account
    @Override
    public void deleteAccount(Account account) {

        account.deleteAll(account.getUsageList(), account.getRecording(), account.getEmployee());
        accountRepository.deleteById(account.getAccountId());
    }

    // Get all registered AccountId
    @Override
    public List<Integer> getAllAccountId() {

        List<Account> allAccount = accountRepository.findAll();
        
        return allAccount.stream()
                          .map(Account::getAccountId)
                          .collect(Collectors.toList());
    }

    // Get Account object by its Id
    @Override
    public Account getById(Integer accountId) {

        Account account = accountRepository.findById(accountId)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with ID: " + accountId));

        return account;
    }
}