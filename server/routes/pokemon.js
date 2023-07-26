const { Router } = require('express')

const pokemonController = require('../controllers/pokemon')

const pokemonRouter = Router();

pokemonRouter.get("/", pokemonController.index)

pokemonRouter.get("/:id", pokemonController.getById)

pokemonRouter.patch("/:id", pokemonController.update);

// pokemonRouter.get("/:name", pokemonController.getByName)

module.exports = pokemonRouter