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


// DELETE
// Adding endpoint without anything after the URL to fill in for later
router.delete('/', (req, res) => {
    console.log('in koalas router delete', req.params.id);

    // Create request for SQL database, leaving blanks for now
    let queryText = `
        
    `;

    // Empty params to fill in for later
    let queryParams = [

    ];

    // Pool query to modify database
    pool.query(queryText, queryParams)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('failed to delete', err);
        })
});


module.exports = koalaRouter;