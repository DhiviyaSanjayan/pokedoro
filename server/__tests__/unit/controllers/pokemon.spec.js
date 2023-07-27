const pokemonController = require("../../../controllers/pokemon");
const Pokemon = require("../../../models/Pokemon");

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
  })

  