const { Pool } = require("pg");
let db

if (process.env.NODE_ENV == "test") {
    console.log("test DB")
    db = new Pool({
        connectionString: process.env.TEST_DB_URL
    })
} else {
    db = new Pool({
        connectionString: process.env.DB_URL
    })
}


console.log("DB connection established.")

module.exports = db;



// const { Pool } = require('pg');

// require("dotenv").config

// const db = new Pool({
//     connectionString: process.env.DB_URL
// })

// // console.log("DB connection established.")


// module.exports = db;


// const { Pool } = require("pg");

// const db = new Pool({
//     connectionString: process.env.DB_URL
// })

// console.log("DB connection established.")

// module.exports = db;

