package com.example.fyp.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>  {

    // Role findByName(String name);

    Role findById(int id);
    // Role findByDescription(String description);
    
}
