CREATE TABLE CustomerProfile (
                                 CustomerID INT PRIMARY KEY,
                                 FirstName VARCHAR(50),
                                 LastName VARCHAR(50),
                                 Email VARCHAR(100),
                                 DateOfBirth DATE
);
INSERT INTO CustomerProfile (CustomerID, FirstName, LastName, Email, DateOfBirth)
VALUES
    (1, 'Alice', 'Johnson', 'alice.johnson@example.com', '1988-04-12'),
    (2, 'Bob', 'Smith', 'bob.smith@example.com', '1990-09-23');

UPDATE CustomerProfile
SET Email = 'bob.smith@newdomain.com'
WHERE CustomerID = 2;