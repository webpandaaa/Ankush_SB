package com.example.insurance.controller;

import com.example.insurance.entity.PremiumCalculation;
import com.example.insurance.repository.PremiumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/premium-history")
@RequiredArgsConstructor
public class PremiumHistoryController {

    private final PremiumRepository premiumRepository;

    @GetMapping("/user/{userId}")
    public List<PremiumCalculation> getByUser(@PathVariable Long userId) {
        return premiumRepository.findAll()
                .stream()
                .filter(p -> p.getUser().getId().equals(userId))
                .toList();
    }
}
