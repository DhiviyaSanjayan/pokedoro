DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  users_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  pass_word VARCHAR(100),
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

INSERT INTO users (username, first_name, last_name, email, pass_word, time_studied)
VALUES
     ('ronaldo7', 'Cristiano', 'Ronaldo', 'cristiano@example.com', 'secure_password', 150),
  ('messi10', 'Lionel', 'Messi', 'lionel@example.com', 'strong_password', 130),
  ('neymarjr', 'Neymar', 'da Silva Santos', 'neymar@example.com', 'safepassword', 110),
  ('mbappe7', 'Kylian', 'Mbappe', 'kylian@example.com', 'bestpassword', 100),
  ('ronaldinho10', 'Ronaldinho', 'de Assis Moreira', 'ronaldinho@example.com', 'mypassword', 90),
  ('beckham23', 'David', 'Beckham', 'david@example.com', 'beckham123', 80),
  ('zidane5', 'Zinedine', 'Zidane', 'zidane@example.com', 'zidane456', 70),
  ('pele10', 'Edson Arantes', 'do Nascimento', 'pele@example.com', 'pele789', 60),
  ('maradona10', 'Diego', 'Maradona', 'maradona@example.com', 'maradona987', 50),
  ('eusebio13', 'Eusébio', 'da Silva Ferreira', 'eusebio@example.com', 'eusebio654', 40);