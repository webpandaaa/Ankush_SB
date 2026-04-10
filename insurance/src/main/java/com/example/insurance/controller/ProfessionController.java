package com.example.insurance.controller;

import com.example.insurance.entity.Profession;
import com.example.insurance.repository.ProfessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professions")
@RequiredArgsConstructor
public class ProfessionController {

    private final ProfessionRepository professionRepository;

    @PostMapping
    public Profession create(@RequestBody Profession profession) {
        return professionRepository.save(profession);
    }

    @GetMapping
    public List<Profession> getAll() {
        return professionRepository.findAll();
    }
}
