const Pokemon = require("../../models/Pokemon");
const Token = require('../../models/Token');
const authenticator = require('../../middleware/authenticator')
const User = require('../../models/User')
const db = require('../connect');

const request = require("supertest");
const app = require("../../app");
const { Pool } = require('pg')

const pool = require('../connect');

// jest.mock("../../database/connect");

// describe("Pokemon Model - getAll", () => {
//     const sampleData = [
//         { pokemon_id: 1, users_id: 1, name: "Bulbasaur", sprite: "sprite-url-1.png", evolves_into: "Ivysaur" },
//         { pokemon_id: 2, users_id: 2, name: "Ivysaur", sprite: "sprite-url-2.png", evolves_into: "Venusaur" },
//         { pokemon_id: 3, users_id: 3, name: "Venusaur", sprite: "sprite-url-3.png", evolves_into: null }
//       ];
  
//     // Mock the database query function to return the sample data
//     db.query.mockResolvedValue({ rows: sampleData});
  
//     it("should get all pokemon", async () => {
//       // Call the getAll function from the Pokemon model
//       const pokemonList = await Pokemon.getAll();

//       expect(db.query).toHaveBeenCalledWith("SELECT * FROM pokemon ORDER BY pokemon_id");
//       expect(Array.isArray(pokemonList)).toBe(true);
//       expect(pokemonList.length).toBe(sampleData.length);
//       expect(pokemonList[0]).toEqual({
//         id: 1,
//         users_id: 1,
//         name: "Bulbasaur",
//         sprite: "sprite-url-1.png",
//         evolves_into: "Ivysaur",
//       });
  
//       db.query.mockResolvedValue({ rows: [] });
  
//       await expect(Pokemon.getAll()).rejects.toThrow("pokemon not found");
//     });

//     it("should get 1 pokemon by id", async () => {
//         // Call the getOneByPokemonId function for a sample ID
//         const pokemonId = 1;
//         const expectedPokemon = sampleData[0];

//         db.query.mockResolvedValueOnce({ rows: [expectedPokemon] });
//         const pokemon = await Pokemon.getOneByPokemonId(pokemonId);
    
//         expect(db.query).toHaveBeenCalledWith("SELECT * FROM pokemon WHERE pokemon_id = $1;", [pokemonId]);
//         expect(pokemon).toEqual({
//           id: expectedPokemon.pokemon_id,
//           users_id: expectedPokemon.users_id,
//           name: expectedPokemon.name,
//           sprite: expectedPokemon.sprite,
//           evolves_into: expectedPokemon.evolves_into,
//         });
    
//         // Test for the scenario when the Pokemon is not found
//         db.query.mockResolvedValueOnce({ rows: [] });
//         const invalidPokemonId = 999;
//         await expect(Pokemon.getOneByPokemonId(invalidPokemonId)).rejects.toThrow("Unable to locate pokemon.");
//       });

//       it("should update the users_id of a Pokemon", async () => {
//         const updatedUsersId = 99; 
//         db.query.mockResolvedValueOnce({ rows: [sampleData[0]] });
//         db.query.mockResolvedValueOnce({ rows: [{ ...sampleData[0], users_id: updatedUsersId }] }); 
    
//         const pokemon = new Pokemon(sampleData[0]);
    

//         const updatedPokemon = await pokemon.update({ users_id: updatedUsersId });
    
//         expect(db.query).toHaveBeenCalledWith("UPDATE pokemon SET users_id = $1 WHERE pokemon_id = $2 RETURNING *;", [
//           updatedUsersId,
//           sampleData[0].pokemon_id,
//         ]);

//         expect(updatedPokemon instanceof Pokemon).toBe(true);
//         expect(updatedPokemon).toEqual({
//           id: sampleData[0].pokemon_id,
//           users_id: updatedUsersId,
//           name: sampleData[0].name,
//           sprite: sampleData[0].sprite,
//           evolves_into: sampleData[0].evolves_into,
//         });
//       });
//     });


describe('Authenticator Middleware', () => {
    it('should allow access for valid token', async () => {
      // Mock valid token
      const validToken = 'valid-token';
  
      // Mock Token.getOneByToken to return a valid token
      Token.getOneByToken = jest.fn().mockReturnValueOnce(validToken);
  
      // Create a mock request object with the necessary headers
      const req = {
        headers: {
          authorization: validToken,
        },
      };
  
      // Create a mock response object with necessary methods
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
  
      // Create a mock next function
      const next = jest.fn();
  
      // Call the authenticator middleware
      await authenticator(req, res, next);
  
      expect(Token.getOneByToken).toHaveBeenCalledWith(validToken);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
    
    it('should handle missing or invalid token', async () => {
    // Mock missing or invalid token
    const missingToken = null;
    const invalidToken = 'invalid-token';

    // Mock Token.getOneByToken to return null for missing or invalid token
    Token.getOneByToken = jest.fn().mockReturnValueOnce(null);

    // Create a mock request object with the necessary headers
    const reqMissing = {
      headers: {
        authorization: missingToken,
      },
    };

    const reqInvalid = {
      headers: {
        authorization: invalidToken,
      },
    };

    // Create a mock response object with necessary methods
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Create a mock next function
    const next = jest.fn();

    // Call the authenticator middleware with missing token
    await authenticator(reqMissing, res, next);
    expect(Token.getOneByToken).toHaveBeenCalledWith(missingToken);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: `User's token doesn't match server` });

    // Reset mocks
    Token.getOneByToken.mockReset();
    res.status.mockClear();
    res.json.mockClear();

    // Call the authenticator middleware with invalid token
    await authenticator(reqInvalid, res, next);
    expect(Token.getOneByToken).toHaveBeenCalledWith(invalidToken);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: `User's token doesn't match server` });
  });
})