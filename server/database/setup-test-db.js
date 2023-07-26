const db = require("./connect");

const createDbEnv = async () => {
  await db.query(`CREATE TABLE users (
    users_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL,
    pass_word VARCHAR(100),
    time_studied INT DEFAULT 0,
    PRIMARY KEY (users_id)
  )`);
};


const populateDbEnv = async () => {
  await db.query(
    "INSERT INTO users (username, pass_word, time_studied) VALUES ('Mike_tyson','Tysonpassword', 200)"
  );
};

const destroyDbEnv = async () => {
  await db.query("DROP TABLE IF EXISTS users");
};

module.exports = { createDbEnv, populateDbEnv, destroyDbEnv };