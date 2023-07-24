const db = require('../database/connect')

class User {

    constructor ({ users_id, username, first_name, last_name, email, pass_word, time_studied }) {
        this.id = users_id;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.pass_word = pass_word
        this.time_studied = time_studied;
    
    }


    static async getAll() {
        const response = await db.query("SELECT * FROM users ORDER BY users_id")
        if (response.rows.length === 0) {
            throw new Error("users not found")
        }
        return response.rows.map(u => new User(u));
    }

    static async getOneByUserId(id) {
        const response = await db.query("SELECT * FROM users WHERE users_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate users.")
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, first_name, last_name, email, pass_word, time_studied } = data;
        const response = await db.query("INSERT INTO users (username, first_name, last_name, email, pass_word, time_studied) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *;", [username, first_name, last_name, email, pass_word, time_studied])
        const userID = response.rows[0].users_id;
        const newUser = await User.getOneByUserId(userID)
        return newUser
    }

    async update(data) {
        const { username, first_name, last_name, email, pass_word, time_studied } = data;
        const response = await db.query("UPDATE users SET username = $1, first_name = $2, last_name = $3, email = $4, pass_word = $5, time_studied = $6  WHERE users_id = $7 RETURNING *;", [ username, first_name, last_name, email, pass_word, time_studied, this.id]);
        const userId = response.rows[0].users_id
        const newUser = await User.getOneByUserId(userId)
        return newUser
    }

    async destroy() {
        const response = await db.query('DELETE FROM users WHERE users_id = $1 RETURNING *;', [this.id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete user.")
        }
        return new User(response.rows[0]);
    }

}

module.exports = User;