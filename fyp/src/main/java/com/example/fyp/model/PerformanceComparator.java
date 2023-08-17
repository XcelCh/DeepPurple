package com.example.fyp.model;

import java.util.Comparator;

import com.example.fyp.controller.dto.EmployeeAnalysisDto;

public class PerformanceComparator implements Comparator<EmployeeAnalysisDto>{

    @Override
    public int compare(EmployeeAnalysisDto o1, EmployeeAnalysisDto o2) {
        
        return -Double.compare(o1.getEmployeeAvgPerformance(), o2.getEmployeeAvgPerformance());
    }
    
    
}
