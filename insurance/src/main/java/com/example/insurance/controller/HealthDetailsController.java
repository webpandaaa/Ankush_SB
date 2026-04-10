package com.example.insurance.controller;

import com.example.insurance.entity.HealthDetails;
import com.example.insurance.entity.User;
import com.example.insurance.repository.HealthDetailsRepository;
import com.example.insurance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
public class HealthDetailsController {

    private final HealthDetailsRepository repository;
    private final UserRepository userRepository;

    @PostMapping("/{userId}")
    public HealthDetails save(
            @PathVariable Long userId,
            @RequestBody HealthDetails health) {

        User user = userRepository.findById(userId).orElseThrow();
        health.setUser(user);
        return repository.save(health);
    }

    @GetMapping("/{userId}")
    public HealthDetails getByUserId(@PathVariable Long userId) {

        return repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Health details not found for user id: " + userId));
    }

}
