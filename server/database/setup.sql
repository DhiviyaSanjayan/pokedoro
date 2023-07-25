DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  users_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  pass_word VARCHAR(100),
  time_studied INT DEFAULT 0,
  PRIMARY KEY (users_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    token CHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (users_id) REFERENCES users("users_id")
);

INSERT INTO users (username, pass_word, time_studied)
VALUES
  ('ronaldo7','secure_password', 150),
  ('messi10','strong_password', 130),
  ('neymarjr', 'safepassword', 110),
  ('mbappe7', 'bestpassword', 100),
  ('ronaldinho10', 'mypassword', 90),
  ('beckham23','beckham123', 80),
  ('zidane5','zidane456', 70),
  ('pele10', 'pele789', 60),
  ('maradona10', 'maradona987', 50),
  ('eusebio13', 'eusebio654', 40);

  