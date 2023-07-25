const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");

async function register(req, res) {
    try {
      const data = req.body;
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
      data["pass_word"] = await bcrypt.hash(data["pass_word"], salt);
      const result = await User.create(data);
      res.status(201).send(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

async function login(req, res) {
    const data = req.body;
    try {
      // retrieve the user from the model based on username inputted
      const user = await User.getOneByUsername(data.username);
      //compare the encrypted password to the plain text password
      const authenticated = await bcrypt.compare(
        data.pass_word,
        user["pass_word"]
      );

      if (!authenticated) {
        throw new Error("Incorrect credentials.");
      } else {
        // if the user is authenticated, we can assign it a token
        const token = await Token.create(user.id);
        //we can use the authenticated object to see if user is authenticated now, and we can pass in the token too in the response
  
        res.status(200).json({ authenticated: true, token: token, userId: user.id});
        
      }
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }

async function logout(req, res) {
    const token = req.headers.authorization;
    try {
      const response = await Token.removeToken(token);
      res.status(202).json({ message: response });
    } catch (error) {
      res.status(403).json({ Error: error.message });
    }
}

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
  index, show, create, update, destroy, register, login, logout
}