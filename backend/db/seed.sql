-- Insert Users
INSERT INTO users (name, email, password_hash, role, location)
VALUES 
('John Wick', 'johnwick@example.com', 'hashedpassword1', 'lender', 'NE Calgary'),
('Matt Damon', 'mattdamon@example.com', 'hashedpassword2', 'borrower', 'SW Calgary'),
('David Lynch', 'davidlynch@example.com', 'hashedpassword3', 'admin', 'SE Calgary');

-- Insert Items
INSERT INTO items (title, description, condition, category, image_url, status, lender_id)
VALUES 
('obd scanner', 'with built in display and freeze diagrams', 'Good', 'Tools', '', 'approved', 1),
('Hammer', 'Steel hammer with rubber grip', 'Like New', 'Tools', '', 'approved', 1);

-- Insert Borrow Request
INSERT INTO borrow_requests (item_id, borrower_id, status, return_due_date)
VALUES (1, 2, 'pending', CURRENT_DATE + INTERVAL '7 days');
