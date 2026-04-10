package com.example.insurance.controller;


import com.example.insurance.entity.PolicyType;
import com.example.insurance.entity.PremiumCalculation;
import com.example.insurance.entity.User;
import com.example.insurance.repository.PolicyTypeRepository;
import com.example.insurance.repository.UserRepository;
import com.example.insurance.service.PremiumService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/premium")
@RequiredArgsConstructor
public class PremiumController {

    private final UserRepository userRepository;
    private final PolicyTypeRepository policyTypeRepository;
    private final PremiumService premiumService;

    @PostMapping("/calculate")
    public PremiumCalculation calculate(
            @RequestParam Long userId,
            @RequestParam Long policyId) {

        User user = userRepository.findById(userId).orElseThrow();
        PolicyType policy = policyTypeRepository.findById(policyId).orElseThrow();

        return premiumService.calculatePremium(user, policy);
    }
}

