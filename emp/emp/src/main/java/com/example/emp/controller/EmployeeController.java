package com.example.emp.controller;

import com.example.emp.entity.Employee;
import com.example.emp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @GetMapping("/")
    public String done() {
        return "Welcome! Use /employee endpoint.";
    }

    @GetMapping("/employee")
    public List<Employee> getEmployees() {
        return service.getAllEmployees();
    }

    @GetMapping("/employee/{id}")
    public Employee getEmpbyId(@PathVariable int id) {
        return service.getEmpById(id);
    }

    @PostMapping("/employee")
    public String saveEmployee(@RequestBody Employee emp) {
    	System.out.println("just checking" + emp.getName());
        service.saveEmployee(emp);
        return "Employee saved successfully!";
    }

    @PutMapping("/employee/{id}")
    public String updateEmployee(@PathVariable int id, @RequestBody Employee emp) {
        boolean updated = service.updateEmployee(id, emp);
        return updated ? "Employee updated successfully!" : "Employee ID not found!";
    }

    @DeleteMapping("/employee/{id}")
    public String deleteEmployee(@PathVariable int id) {
        boolean deleted = service.deleteEmployee(id);
        return deleted ? "Employee deleted successfully!" : "Employee ID not found!";
    }
}
