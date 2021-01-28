const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...
router.get('/', (req, res) => {
    let query = 'SELECT * FROM "groceries" ORDER BY "id" ASC;';
    pool.query(query).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting grocery list', error);
      res.sendStatus(500);
    });
  });

module.exports = router;