package com.example.insurance.controller;

import com.example.insurance.entity.PolicyType;
import com.example.insurance.repository.PolicyTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
@RequiredArgsConstructor
public class PolicyTypeController {

    private final PolicyTypeRepository policyTypeRepository;

    @PostMapping
    public PolicyType create(@RequestBody PolicyType policyType) {
        return policyTypeRepository.save(policyType);
    }

    @GetMapping
    public List<PolicyType> getAll() {
        return policyTypeRepository.findAll();
    }
}
