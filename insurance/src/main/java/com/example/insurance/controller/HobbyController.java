package com.example.insurance.controller;

import com.example.insurance.entity.Hobby;
import com.example.insurance.repository.HobbyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hobbies")
@RequiredArgsConstructor
public class HobbyController {

    private final HobbyRepository hobbyRepository;

    @PostMapping
    public Hobby create(@RequestBody Hobby hobby) {
        return hobbyRepository.save(hobby);
    }

    @GetMapping
    public List<Hobby> getAll() {
        return hobbyRepository.findAll();
    }
}
