package com.example.fyp.dao;

import com.example.fyp.entity.Role;

public interface RoleDao {
    
    public Role findRoleByName(String roleName);
}
