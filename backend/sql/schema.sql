CREATE DATABASE IF NOT EXISTS support_ticket;
USE support_ticket;

DROP TABLE IF EXISTS tickets;

CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  priority ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL DEFAULT 'Medium',
  assigned_agent VARCHAR(120) NOT NULL,
  status ENUM('Open', 'In Progress', 'Escalated', 'Resolved') NOT NULL DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
