DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  users_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  -- password CHAR(10),
  time_studied INT,
  PRIMARY KEY (users_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    token CHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (users_id) REFERENCES users("users_id")
);

INSERT INTO users (username, first_name, last_name, email, time_studied)
VALUES
    ('ronaldo_7', 'Cristiano', 'Ronaldo', 'cristiano.ronaldo@example.com', 25),
    ('leomessi10', 'Lionel', 'Messi', 'lionel.messi@example.com', 50),
    ('neymarjr10', 'Neymar', 'Junior', 'neymar.junior@example.com', 40),
    ('mbappe_7', 'Kylian', 'Mbappe', 'kylian.mbappe@example.com', 0),
    ('ronaldinho10', 'Ronaldinho', 'Gaucho', 'ronaldinho.gaucho@example.com', 120),
    ('zidane_5', 'Zinedine', 'Zidane', 'zinedine.zidane@example.com', 80),
    ('beckham_23', 'David', 'Beckham', 'david.beckham@example.com', 45),
    ('kaka_22', 'Kaka', 'Da Silva', 'kaka.dasilva@example.com', 60),
    ('rooney_9', 'Wayne', 'Rooney', 'wayne.rooney@example.com', 70),
    ('puyol_5', 'Carles', 'Puyol', 'carles.puyol@example.com', 5);