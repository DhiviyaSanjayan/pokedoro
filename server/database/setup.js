// require("dotenv").config();

// const fs = require('fs');

// const db = require('./connect')

// const path = require('path')

// const sql = fs.readFileSync(path.join(__dirname,'./setup.sql')).toString()

// db.query(sql)
//     .then(data => console.log("Set-up Done!!!!!!!"))
//     .catch(error => console.log(error));



const fs = require('fs');
require("dotenv").config();

const db = require("./connect");

const sql = fs.readFileSync('./database/setup.sql').toString();

db.query(sql)
    .then(data => console.log("Set-up complete."))
    .catch(error => console.log(error));


