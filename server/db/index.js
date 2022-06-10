const {Pool} = require('pg');

require('dotenv').config();

const db = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
})

db.connect();


module.exports = db;