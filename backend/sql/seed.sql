USE support_ticket;

INSERT INTO tickets (customer_name, subject, priority, assigned_agent, status, created_at) VALUES
('Praveen Kumar', 'Unable to login to customer portal', 'High', 'Prem Sai', 'Open', NOW() - INTERVAL 2 MINUTE),
('Manognya', 'Payment failed but amount deducted', 'Critical', 'Usha', 'Escalated', NOW() - INTERVAL 8 MINUTE),
('Harika', 'Need invoice copy for last order', 'Low', 'Prem Sai', 'Resolved', NOW() - INTERVAL 20 MINUTE),
('Anusha', 'Application loading very slowly', 'Medium', 'Usha', 'In Progress', NOW() - INTERVAL 35 MINUTE),
('Madhu', 'Service request not assigned', 'High', 'Prem Sai', 'Open', NOW() - INTERVAL 1 HOUR)
('Remana', 'Service request not assigned', 'High', 'Prem Sai', 'Open', NOW() - INTERVAL 1 HOUR);
