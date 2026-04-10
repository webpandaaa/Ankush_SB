CREATE TABLE department (
  id BIGINT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE employees (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id VARCHAR(50),
    salary DOUBLE
);