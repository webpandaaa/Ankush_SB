package com.example.springsecu.repo;

import com.example.springsecu.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<Users, Long> {

    Users findByUsername(String username);
}