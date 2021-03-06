const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg');
const testParams = require('../module/testParams');

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
    console.log('in GET /koalas');
    let queryText = `SELECT * FROM "koalas" ORDER BY "name"`
    pool.query(queryText).then((result) => {
            res.send(result.rows);
    })
    .catch((err) => {
        console.log('error getting koalas', err);
        res.sendStatus(500);
    })
})

// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;
    console.log('Adding koala', newKoala);

    let queryText = `
            INSERT INTO "koalas" 
                ("name", "gender", "age", "ready_to_transfer", "notes")
            VALUES ($1, $2, $3, $4, $5);
            `;
    let isTrueSet = (newKoala.ready_to_transfer === 'true')

    let queryParams = [
            newKoala.name,
            newKoala.gender,
            Number(newKoala.age), 
            isTrueSet, 
            newKoala.notes
        ];
        console.log()
        
        if (!testParams(queryParams) ) {
            console.log('data validation failed 🤢');
            res.sendStatus(400);
            return;
        };

    pool.query(queryText, queryParams)
            .then(() => {
                res.sendStatus(201);
            })
            .catch((error) => {
                console.log(`Error adding new koala 👎`, error);
                res.sendStatus(500);
            });
}); // end of POST endpoints

// PUT
koalaRouter.put('/:id', (req, res) => {
    console.log('id is', req.params.id);
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
});

// DELETE
// Adding endpoint
koalaRouter.delete('/:id', (req, res) => {
    console.log('in koalas router delete', req.params.id);

    // Create request for SQL database, leaving blanks for now
    let queryText = `
        DELETE FROM "koalas"
        WHERE id = $1;
    `;

    // Empty params to fill in for later
    let queryParams = [
        req.params.id,
    ];

    // Pool query to modify database
    pool.query(queryText, queryParams)
        .then( () => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('failed to delete', err);
            res.sendStatus(500);
        })
    console.log('in DELETE /koalas');
});


module.exports = koalaRouter;