package com.example.fyp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.fyp.entity.Usages;

// Usages Repository for Usages Entity to access to the Database
public interface UsageRepository extends JpaRepository<Usages, Long>{
    
    @Query("SELECT u FROM Usages u WHERE u.account.accountId = :accountId AND u.billing.billingId IS NULL")
    List<Usages> findUnbilledUsage(Integer accountId);

    @Query("SELECT SUM(u.minutesUsed * u.rate) FROM Usages u WHERE u.account.accountId = :accountId AND u.billing.billingId IS NULL")
    Float findTotalUnbilledUsage(Integer accountId);
}
