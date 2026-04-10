package com.example.insurance.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.Set;

@Data
public class UserRequestDto {

    private String fullName;
    private LocalDate dateOfBirth;
    private String gender;
    private String email;
    private String mobile;
    private Long professionId;
    private Set<Long> hobbyIds;
}
