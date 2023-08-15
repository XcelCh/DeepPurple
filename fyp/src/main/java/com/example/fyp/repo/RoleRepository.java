package com.example.fyp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Role;

// Role Repository for Role Entity to access to the Database
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>  {

    Role findById(int id);
}
