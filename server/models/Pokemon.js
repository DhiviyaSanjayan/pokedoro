const db = require("../database/connect");

class Pokemon {
  constructor({ pokemon_id, users_id, name, sprite, evolves_into }) {
    this.id = pokemon_id;
    this.users_id = users_id;
    this.name = name;
    this.sprite = sprite;
    this.evolves_into = evolves_into;
  }

  static async getAll() {
    const response = await db.query(
      "SELECT * FROM pokemon ORDER BY pokemon_id"
    );
    if (response.rows.length === 0) {
      throw new Error("pokemon not found");
    }
    return response.rows.map((p) => new Pokemon(p));
  }

  static async getOneByPokemonId(id) {
    const response = await db.query(
      "SELECT * FROM pokemon WHERE pokemon_id = $1;",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate pokemon.");
    }
    return new Pokemon(response.rows[0]);
  }

  async update(data) {
    const users_id = data.users_id;
    const response = await db.query(
      "UPDATE pokemon SET users_id = $1 WHERE pokemon_id = $2 RETURNING *;",
      [users_id, this.id]
    );
    const PokemonId = response.rows[0].pokemon_id;
    const newPokemon = await Pokemon.getOneByPokemonId(PokemonId);
    return newPokemon;
  }
}

module.exports = Pokemon;
