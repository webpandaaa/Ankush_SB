package com.example.insurance.service;

import com.example.insurance.dto.UserRequestDto;
import com.example.insurance.entity.Hobby;
import com.example.insurance.entity.Profession;
import com.example.insurance.entity.User;
import com.example.insurance.repository.HobbyRepository;
import com.example.insurance.repository.ProfessionRepository;
import com.example.insurance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ProfessionRepository professionRepository;
    private final HobbyRepository hobbyRepository;

    // CREATE
    public User createUser(UserRequestDto dto) {

        Profession profession = professionRepository
                .findById(dto.getProfessionId())
                .orElseThrow(() -> new RuntimeException("Profession not found"));

        Set<Hobby> hobbies = new HashSet<>(
                hobbyRepository.findAllById(dto.getHobbyIds())
        );

        User user = new User();
        mapFields(user, dto, profession, hobbies);

        return userRepository.save(user);
    }

    // GET ALL
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET BY ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // UPDATE
    public User updateUser(Long id, UserRequestDto dto) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profession profession = professionRepository
                .findById(dto.getProfessionId())
                .orElseThrow(() -> new RuntimeException("Profession not found"));

        Set<Hobby> hobbies = new HashSet<>(
                hobbyRepository.findAllById(dto.getHobbyIds())
        );

        mapFields(existingUser, dto, profession, hobbies);

        return userRepository.save(existingUser);
    }

    // DELETE
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);
    }

    // COMMON FIELD MAPPER (clean code 🔥)
    private void mapFields(User user,
                           UserRequestDto dto,
                           Profession profession,
                           Set<Hobby> hobbies) {

        user.setFullName(dto.getFullName());
        user.setDateOfBirth(dto.getDateOfBirth());
        user.setGender(dto.getGender());
        user.setEmail(dto.getEmail());
        user.setMobile(dto.getMobile());
        user.setProfession(profession);
        user.setHobbies(hobbies);
    }
}
