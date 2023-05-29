package com.example.fyp.dao;

import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Role;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class RoleDaoImpl implements RoleDao {

    private EntityManager entityManager;

    @Override
    public Role findRoleByName(String roleName) {
       
        TypedQuery<Role> theQuery = entityManager.createQuery("from Role where name=:roleName", Role.class);
        theQuery.setParameter("roleName", roleName);

        Role theRole = null;

        try {
            theRole = theQuery.getSingleResult();
        } catch (Exception e) {
            theRole = null;
        }

        return theRole;
    }
    
}