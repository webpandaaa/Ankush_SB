package com.example.insurance.entity;


import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PolicyType extends BaseEntity {

    private String name;         // TERM, HEALTH
    private double basePremium;
}

