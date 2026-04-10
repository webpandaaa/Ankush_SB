package com.example.insurance.entity;


import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Profession extends BaseEntity {

    private String name;          // ARMY, IT
    private int riskScore;    // 30, 5
}