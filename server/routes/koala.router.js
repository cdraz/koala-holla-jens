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
koalaRouter.get('/', (req,res) => {
      // let queryText = `SELECT * FROM "koalas"`
      // pool.query(queryText).then((result) => {
      //       res.send(result.rows);
      // }).catch((err) => {
      //    console.log('error getting koalas', err);
      //    res.sendStatus(500)'
      // })
      console.log('in GET /koalas');
})

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
koalaRouter.put('/:id', (req, res) => {
    console.log('id is', req.params.id);
    /*
    let queryText = `
        UPDATE "koalas"
        SET "ready_to_transfer" = $1
        WHERE "id" = $2;
    `

    let queryParams = [
        req.body.ready_to_transfer,
        req.params.id
    ]

    pool.query(queryText, queryParams)
        .then( dbRes => {
            res.sendStatus(201);
        })
        .catch( err => {
            console.log('PUT /koalas failed', err);
        })
    */
});

// DELETE

module.exports = koalaRouter;