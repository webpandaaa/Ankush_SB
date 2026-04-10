package com.example.insurance.service;

import com.example.insurance.entity.HealthDetails;
import com.example.insurance.entity.Hobby;
import com.example.insurance.entity.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
public class RiskCalculationService {

    public int calculateRiskScore(User user, HealthDetails health) {

        int score = 0;

        score += user.getProfession().getRiskScore();


        if (user.getHobbies() != null) {
            score += user.getHobbies()
                    .stream()
                    .mapToInt(Hobby::getRiskScore)
                    .sum();
        }

        if (health.isSmoker()) score += 20;
        if (health.isAlcoholic()) score += 10;
        if (health.isDiabetes()) score += 15;
        if (health.isBp()) score += 10;
        if (health.getBmi() > 30) score += 15;

        int age = Period.between(user.getDateOfBirth(), LocalDate.now()).getYears();
        if (age > 45) score += 20;
        else if (age > 30) score += 10;

        return score;
    }

    public String getRiskCategory(int score) {
        if (score < 30) return "LOW";
        if (score < 60) return "MEDIUM";
        if (score < 90) return "HIGH";
        return "VERY_HIGH";
    }
}
