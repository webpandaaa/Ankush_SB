package com.example.insurance.repository;

import com.example.insurance.entity.PremiumCalculation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PremiumRepository extends JpaRepository<PremiumCalculation, Long> {
}

