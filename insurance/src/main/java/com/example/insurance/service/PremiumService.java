package com.example.insurance.service;

import com.example.insurance.entity.*;
import com.example.insurance.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PremiumService {

    private final RiskCalculationService riskService;
    private final PremiumRepository premiumRepository;
    private final HealthDetailsRepository healthDetailsRepository;

    public PremiumCalculation calculatePremium(User user, PolicyType policy) {

        HealthDetails health = healthDetailsRepository
                .findByUserId(user.getId())
                .orElseGet(() -> {
                    HealthDetails h = new HealthDetails();
                    h.setUser(user);
                    return healthDetailsRepository.save(h);
                });

        int riskScore = riskService.calculateRiskScore(user, health);
        String category = riskService.getRiskCategory(riskScore);

        double multiplier =
                category.equals("VERY_HIGH") ? 2.2 :
                        category.equals("HIGH") ? 1.8 :
                                category.equals("MEDIUM") ? 1.3 : 1.0;

        PremiumCalculation pc = new PremiumCalculation();
        pc.setUser(user);
        pc.setPolicyType(policy);
        pc.setTotalRiskScore(riskScore);
        pc.setRiskCategory(category);
        pc.setFinalPremium(policy.getBasePremium() * multiplier);

        return premiumRepository.save(pc);
    }
}