package com.example.insurance.repository;


import com.example.insurance.entity.HealthDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HealthDetailsRepository extends JpaRepository<HealthDetails, Long> {

    Optional<HealthDetails> findByUserId(Long userId);
}

