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