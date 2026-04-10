package com.example.insurance.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PremiumCalculation extends BaseEntity {

    @ManyToOne
    @JsonIgnoreProperties({"healthDetails"})
    private User user;

    @ManyToOne
    private PolicyType policyType;

    private int totalRiskScore;
    private String riskCategory;
    private double finalPremium;
}
