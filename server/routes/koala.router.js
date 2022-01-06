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


// PUT


// DELETE

module.exports = koalaRouter;