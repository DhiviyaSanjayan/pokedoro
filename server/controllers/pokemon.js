const Pokemon = require("../models/Pokemon");

async function index(req, res) {
    try {
        const user = await Pokemon.getAll();
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({"error": error.message})
    }
}

async function getById(req,res){
    try{
        const id = parseInt(req.params.id);
        const pokemon = await Pokemon.getOneByPokemonId(id);
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(404).json({"error": error.message})
    } 
}

async function getByName(req,res){
    try{
        const name = req.params.name
        const pokemon = await Pokemon.getOneByName(name);
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(404).json({"error": error.message})
    } 
}


module.exports = {
    index, getById, getByName
  }