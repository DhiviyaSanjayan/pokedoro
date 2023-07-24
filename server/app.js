const express = require('express');
const cors = require('cors');
const logger = require('morgan');
 
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// app.get("/", (req, res) => {
//     res.status(200).json({
//         name: "I can't centre a dhiv",
//         description: "A pokedoro to help you focus on studying "
//     })
// })

module.exports = app;
