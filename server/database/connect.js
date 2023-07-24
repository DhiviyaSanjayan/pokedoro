// const { Pool } = require('pg');

// require("dotenv").config

// const db = new Pool({
//     connectionString: process.env.DB_URL
// })

// // console.log("DB connection established.")


// module.exports = db;


const { Pool } = require("pg");

const db = new Pool({
    connectionString: process.env.DB_URL
})

console.log("DB connection established.")

module.exports = db;