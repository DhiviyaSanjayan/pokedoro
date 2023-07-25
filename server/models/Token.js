//import uuid to generate tokens
const { v4: uuidv4 } = require("uuid");

const db = require("../database/connect");

class Token {
  constructor({ token_id, users_id, token }) {
    this.token_id = token_id;
    this.users_id = users_id;
    this.token = token;
  }

  static async create(users_id) {
    //generate a token using library uuidv4- it generates a random token with a certain number of characters
    const token = uuidv4();
    //insert the token into the token table - and return the tokens id
    const response = await db.query(
      "INSERT INTO token (users_id, token) VALUES ($1, $2) RETURNING token_id;",
      [users_id, token]
    );
    //grab the token id, check it's in the database and return it
    const newId = response.rows[0].token_id;
    const newToken = await Token.getOneById(newId);
    //return the token in the model
    return newToken;
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM token WHERE token_id = $1", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate token.");
    } else {
      return new Token(response.rows[0]);
    }
  }

  static async getOneByToken(token) {
    const response = await db.query("SELECT * FROM token WHERE token = $1", [
      token,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate token.");
    } else {
      return new Token(response.rows[0]);
    }
  }

  static async removeToken(token) {
    const response = await db.query("DELETE FROM token WHERE token = $1", [
      token,
    ]);
    if (!response) {
      throw new Error("Unable to locate token.");
    } else {
      return "Token Deleted";
    }
  }
}

module.exports = Token;
