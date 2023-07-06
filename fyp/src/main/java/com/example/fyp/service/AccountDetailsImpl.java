package com.example.fyp.service;

import java.util.Collection;
import java.util.Objects;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.fyp.entity.Account;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class AccountDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  // private String username;
  private String email;
  private Collection<? extends GrantedAuthority> authorities;

  @JsonIgnore
  private String password;

  public AccountDetailsImpl(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public static AccountDetailsImpl build(Account account) {
    return new AccountDetailsImpl( 
        account.getEmail(),
        account.getPassword());
  }

  @Override
  public String getUsername() {
    return email;
  }

  // public String getEmail() {
  //   return email;
  // }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    AccountDetailsImpl account = (AccountDetailsImpl) o;
    return Objects.equals(email, account.email);
  }
}