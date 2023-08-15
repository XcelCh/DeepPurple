package com.example.fyp.security.payload.response;

// Class to build the JWT response
public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private String email;

  public JwtResponse(String accessToken, String email) {
    this.token = accessToken;
    this.email = email;
  }

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}