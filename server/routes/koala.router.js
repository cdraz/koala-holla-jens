const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const config = {
      database: 'koala_holla',
      host: 'localhost',
      port: 5432,
}

const pool = new pg.Pool(config);

pool.on("connect", () => {
      console.log('connected to postgres');
});

pool.on('error', (err) => {
      console.log('error connecting to postgres', err);
});

// GET


// POST
koalaRouter.post('/', (req, res) => {
      let newKoala = req.body;
      console.log('Adding koala', newKoala);
      
      let queryText = `
            INSERT INTO "books" 
                  ("name", "gender", "age", "ready_to_transfer", "notes")
            VALUES ($1, $2, $3, $4, $5);
            `;
      pool.query(queryText, [newKoala.name, newKoala.age, newKoala.ready_to_transfer, newKoala.notes])
            .then(result => {
                  res.sendStatus(201);
            })
            .catch(error => {
                  console.log(`Error adding new koala 👎`, error);
                  res.sendStatus(500);
            });
}); // end of POST endpoints

// PUT


// DELETE

module.exports = koalaRouter;