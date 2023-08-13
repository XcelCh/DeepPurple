package com.example.fyp.utils;

import java.util.ArrayList;
import java.util.List;

import com.example.fyp.entity.Transcript;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Container {
    private List<Transcript> transcriptions;
    private double[] data;

    public Container(double[] data){
        this.data = data;
        transcriptions = new ArrayList<>();
    }
}

