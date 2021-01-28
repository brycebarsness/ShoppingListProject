const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...
router.post('/', (req,res) => {
    const item = req.body
    const queryText  = `INSERT INTO groceries ("name", "quantity", "unit")
                    VALUES ($1, $2, $3);`;
    pool.query(queryText, [item.name, item.quantity, item.unit])
    .then((result) => {
        console.log('Added Item to database', item);
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log(`Error making database query ${queryText}`, err);
        res.sendStatus(500);
    });
});


module.exports = router;