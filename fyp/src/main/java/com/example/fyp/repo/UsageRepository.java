package com.example.fyp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.fyp.entity.Usages;

public interface UsageRepository extends JpaRepository<Usages, Long>{
    
    // @Query("SELECT u.account.accountId, u.usageDate, SUM(u.minutesUsed * u.rate) " +
    //        "FROM Usages u " +
    //        "WHERE u.account.accountId = :accountId " +
    //        "AND FUNCTION('YEAR', u.usageDate) = FUNCTION('YEAR', CURRENT_DATE) " +
    //        "AND FUNCTION('MONTH', u.usageDate) = FUNCTION('MONTH', CURRENT_DATE) " +
    //        "GROUP BY u.account.accountId, u.usageDate")
    // List<Object[]> getSumOfUsageByAccountId(Integer accountId);

    @Query("SELECT u.account.accountId, SUM(u.minutesUsed * u.rate) " +
           "FROM Usages u " +
           "WHERE u.account.accountId = :accountId " +
           "AND u.billing.billingId = null " +
           "AND YEAR(u.usageDate) = YEAR(CURRENT_DATE) " +
           "AND MONTH(u.usageDate) = MONTH(CURRENT_DATE) " +
           "GROUP BY u.account.accountId")
    List<Object[]> getSumOfUsageByAccountId(Integer accountId);

    @Query("SELECT u " +
           "FROM Usages u " +
           "WHERE u.account.accountId = :accountId " +
           "AND u.billing.billingId IS NULL")
    List<Usages> findUnbilledUsage(Integer accountId);

    @Query("SELECT SUM(u.minutesUsed * u.rate) " +
           "FROM Usages u " +
           "WHERE u.account.accountId = :accountId " +
           "AND u.billing.billingId IS NULL")
    Float findTotalUnbilledUsage(Integer accountId);

}
