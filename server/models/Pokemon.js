const db = require('../database/connect')

class Pokemon {

    constructor ({ pokemon_id, name, sprite, evolves_into }) {
        this.id = pokemon_id;
        this.name = name;
        this.sprite = sprite
        this.time_studied = evolves_into;
    }

static async getAll() {
    const response = await db.query("SELECT * FROM pokemon ORDER BY pokemon_id")
    if (response.rows.length === 0) {
        throw new Error("pokemon not found")
    }
    return response.rows.map(u => new {Pokemon}(u));
    }


static async getOneByPokemonId(id) {
    const response = await db.query("SELECT * FROM pokemon WHERE pokemon_id = $1;", [id]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate pokemon.")
    }
    return new User(response.rows[0]);
}

static async getOneByName(name) {
    const response = await db.query("SELECT * FROM users WHERE name ILIKE $1", [name]);

    if (response.rows.length != 1) {
      throw new Error("Pokemon with the provided name not found");
    }
    return new User(response.rows[0]);
  }


}

module.exports = Pokemon;