const pokemonController = require("../../../../controllers/pokemon");
const Pokemon = require("../../../../models/Pokemon");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));

const mockRes = { status: mockStatus };

describe("index", () => {
    test("it returns pokemon with a 200 status code", async () => {
      let pokemon = [
        {
            pokemon_id: 1,
            users_id: 1, 
            name: "Bulbasaur",
            sprite: "sprite-url-1.png",
            evolves_into: "Ivysaur"
        },
      ];
      jest.spyOn(Pokemon, "getAll").mockResolvedValue(pokemon);
      await pokemonController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(pokemon);
    });

    describe("show", () => {
        test("it returns a pokemon with a 200 status code", async () => {
          let testPokemon = {
            pokemon_id: 2,
            users_id: 1, 
            name: "Bulbasaur 2",
            sprite: "sprite-url-1.png",
            evolves_into: "Ivysaur"
          };
  
          jest.spyOn(Pokemon, "getOneByPokemonId").mockResolvedValue(new Pokemon(testPokemon));
  
          const mockReq = { params: { pokemon_id: 2 } };
          await pokemonController.getById(mockReq, mockRes);
          expect(mockStatus).toHaveBeenCalledWith(200);
          expect(mockJson).toHaveBeenCalledWith(new Pokemon(testPokemon));
        })
    })

    // describe('update', () => {
    //   test('it updates a Pokemon and returns the updated Pokemon with a 200 status code', async () => {
    //     const testPokemon = {
    //       pokemon_id: 3,
    //       users_id: 1,
    //       name: "Ivysaur",
    //       sprite: "sprite-url-1.png",
    //       evolves_into: "Venasuar"
    //     };

    //     const mockDbQuery = jest.fn();
    //     mockDbQuery.mockResolvedValue({
    //       rows: [{ pokemon_id: testPokemon.pokemon_id }],
    //     });

    //     const getOneByPokemonIdSpy = jest
    //       .spyOn(Pokemon, 'getOneByPokemonId')
    //       .mockResolvedValue({ id: testPokemon.pokemon_id, update: jest.fn() });

    //     const mockReq = { body: testPokemon, params: { id: testPokemon.pokemon_id } };
    //     const mockRes = {
    //       status: jest.fn(() => mockRes),
    //       json: jest.fn(),
    //     };
    //     await pokemonController.update(mockReq, mockRes);

    //     expect(getOneByPokemonIdSpy).toHaveBeenCalledWith(testPokemon.pokemon_id);
    //     expect(mockDbQuery).toHaveBeenCalledWith(
    //       'UPDATE pokemon SET users_id = $1, name = $2, sprite = $3, evolves_into = $4 WHERE pokemon_id = $5 RETURNING *;',
    //       [testPokemon.users_id, testPokemon.name, testPokemon.sprite, testPokemon.evolves_into, testPokemon.pokemon_id]
    //     );
    //     expect(mockRes.status).toHaveBeenCalledWith(200);
    //     expect(mockRes.json).toHaveBeenCalledWith({ id: testPokemon.pokemon_id, update: expect.any(Function) });
     // });
     // });
    });
