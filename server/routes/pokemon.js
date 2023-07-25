const { Router } = require('express')

const pokemonController = require('../controllers/pokemon')

const pokemonRouter = Router();

pokemonRouter.get("/", pokemonController.index)
pokemonRouter.get("/:id", pokemonController.getById)
pokemonRouter.get("/:name", pokemonController.getByName)
