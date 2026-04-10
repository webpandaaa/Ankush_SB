package com.example.emp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.emp.entity.Employee;
import com.example.emp.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public List<Employee> getAllEmployees() {
        List<Employee> employees = repository.fetchAllEmployees();
        System.out.println("All Employees: " + employees);
        return employees;
    }

    public Employee getEmpById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Employee saveEmployee(Employee emp) {
        return repository.save(emp);
    }

    public boolean updateEmployee(int id, Employee emp) {
        Optional<Employee> existing = repository.findById(id);
        if (existing.isPresent()) {
            Employee e = existing.get();
            e.setName(emp.getName());
            e.setDepartment_id(null);
            repository.save(e);
            return true;
        }
        return false;
    }

    public boolean deleteEmployee(int id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
