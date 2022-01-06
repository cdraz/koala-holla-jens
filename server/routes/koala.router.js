const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const config = {
      database: 'koala_holla',
      host: 'localhost',
      port: 5432,
}

const pool = new pg.pool(config);

pool.on("connect", () => {
      console.log('connected to postgres');
});

pool.on('error', (err) => {
      console.log('error connecting to postgres', err);
});

// GET


// POST


// PUT


// DELETE

module.exports = koalaRouter;