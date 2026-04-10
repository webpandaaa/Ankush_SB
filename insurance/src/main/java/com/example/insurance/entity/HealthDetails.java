package com.example.insurance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class HealthDetails extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    @JsonIgnore
    private User user;

    private boolean smoker;
    private boolean alcoholic;
    private boolean diabetes;
    private boolean bp;
    private double bmi;
}
