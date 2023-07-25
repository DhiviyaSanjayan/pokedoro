const bcrypt = require('bcrypt')

const User = require('../models/User')

async function register (req, res) {
    try{
        const data = req.body;

        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

        data.password = await bcrypt.hash(data.password, salt);
        // data["password"] = await bcrypt.hash(data["password"], salt);
        
        console.log(data.password)

        const result = await User.create(data)

        res.status(201).send(result);
    } catch (error) {
        res.status(400).send({"error": "Could not register"})
    }
};

async function login (req, res) {
    const data = req.body;
    res.status(200).send(data);
};

async function index(req, res) {
    try {
        const user = await User.getAll();
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({"error": error.message})
    }
}

async function show(req,res){
    try{
        const id = parseInt(req.params.id);
        const user = await User.getOneByUserId(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({"error": error.message})
    } 
}

async function create (req, res) {
    try {
        const data = req.body;
        const newUser = await User.create(data);
        res.status(201).json(newUser);
    } catch(error) {
        res.status(400).json({"error": error.message});
    }
}

async function update (req, res) {
    try {
        const data = req.body;
        const Id = parseInt(req.params.id)
        const user = await User.getOneByUserId(Id);
        const result = await user.update(data);
        console.log("Hello")

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
}

async function destroy (req, res) {
    try {
        const Id = req.params.id
        const user = await User.getOneByUserId(Id);
        const result = await user.destroy()
        res.status(204).json(result)
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
};


module.exports = {
  index, show, create, update, destroy, register, login
}