package com.example.emp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "department")
@Data               
@NoArgsConstructor  
@AllArgsConstructor 
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}
