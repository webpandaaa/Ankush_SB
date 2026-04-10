package com.example.insurance.repository;


import com.example.insurance.entity.PolicyType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyTypeRepository  extends JpaRepository<PolicyType, Long> {
}