package com.example.fyp.model;

public class ResponseStatus<T> {
    private boolean success;
    private String message;
    private T data;

    // Get Method
    public boolean getSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
    
    public T getData() {
        return data;
    }

    // Set Method
    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(T data) {
        this.data = data;
    }
}
