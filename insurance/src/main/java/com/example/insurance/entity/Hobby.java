package com.example.insurance.entity;


import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Hobby extends BaseEntity {

    private String name;       // SKYDIVING
    private int riskScore;     // 25
}

