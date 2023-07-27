const Pokemon = require("../../../../models/Pokemon");
jest.mock("../../../connect");
const db = require('../../../connect');

describe("Pokemon Model - getAll", () => {
    const sampleData = [
        { pokemon_id: 1, users_id: 1, name: "Bulbasaur", sprite: "sprite-url-1.png", evolves_into: "Ivysaur" },
        { pokemon_id: 2, users_id: 2, name: "Ivysaur", sprite: "sprite-url-2.png", evolves_into: "Venusaur" },
        { pokemon_id: 3, users_id: 3, name: "Venusaur", sprite: "sprite-url-3.png", evolves_into: null }
      ];
  
    // Mock the database query function to return the sample data
    db.query.mockResolvedValue({ rows: sampleData});
  
    it("should get all pokemon", async () => {
      // Call the getAll function from the Pokemon model
      const pokemonList = await Pokemon.getAll();

      expect(db.query).toHaveBeenCalledWith("SELECT * FROM pokemon ORDER BY pokemon_id");
      expect(Array.isArray(pokemonList)).toBe(true);
      expect(pokemonList.length).toBe(sampleData.length);
      expect(pokemonList[0]).toEqual({
        id: 1,
        users_id: 1,
        name: "Bulbasaur",
        sprite: "sprite-url-1.png",
        evolves_into: "Ivysaur",
      });
  
      db.query.mockResolvedValue({ rows: [] });
  
      await expect(Pokemon.getAll()).rejects.toThrow("pokemon not found");
    });

    it("should get 1 pokemon by id", async () => {
        // Call the getOneByPokemonId function for a sample ID
        const pokemonId = 1;
        const expectedPokemon = sampleData[0];

        db.query.mockResolvedValueOnce({ rows: [expectedPokemon] });
        const pokemon = await Pokemon.getOneByPokemonId(pokemonId);
    
        expect(db.query).toHaveBeenCalledWith("SELECT * FROM pokemon WHERE pokemon_id = $1;", [pokemonId]);
        expect(pokemon).toEqual({
          id: expectedPokemon.pokemon_id,
          users_id: expectedPokemon.users_id,
          name: expectedPokemon.name,
          sprite: expectedPokemon.sprite,
          evolves_into: expectedPokemon.evolves_into,
        });
    
        // Test for the scenario when the Pokemon is not found
        db.query.mockResolvedValueOnce({ rows: [] });
        const invalidPokemonId = 999;
        await expect(Pokemon.getOneByPokemonId(invalidPokemonId)).rejects.toThrow("Unable to locate pokemon.");
      });

      it("should update the users_id of a Pokemon", async () => {
        const updatedUsersId = 99; 
        db.query.mockResolvedValueOnce({ rows: [sampleData[0]] });
        db.query.mockResolvedValueOnce({ rows: [{ ...sampleData[0], users_id: updatedUsersId }] }); 
    
        const pokemon = new Pokemon(sampleData[0]);
    

        const updatedPokemon = await pokemon.update({ users_id: updatedUsersId });
    
        expect(db.query).toHaveBeenCalledWith("UPDATE pokemon SET users_id = $1 WHERE pokemon_id = $2 RETURNING *;", [
          updatedUsersId,
          sampleData[0].pokemon_id,
        ]);

        expect(updatedPokemon instanceof Pokemon).toBe(true);
        expect(updatedPokemon).toEqual({
          id: sampleData[0].pokemon_id,
          users_id: updatedUsersId,
          name: sampleData[0].name,
          sprite: sampleData[0].sprite,
          evolves_into: sampleData[0].evolves_into,
        });
      });

      
    });

