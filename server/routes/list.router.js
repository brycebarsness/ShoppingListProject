const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...
router.post('/', (req,res) => {
    const item = req.body
    console.log(req.body);
    const queryText  = `INSERT INTO "groceries" ("name", "quantity", "unit")
                    VALUES (${item.name}, ${item.quantity}, ${item.unit});`;
    console.log(queryText);
    pool.query(queryText)
    .then((result) => {
        console.log('Added Item to database', item);
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log(`Error making database query ${queryText}`, err);
        res.sendStatus(500);
    });
});

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

  router.delete('/:id', (req, res) => {
    let id = req.params.id
    console.log('Deleting item number', id);
    
    let queryText = `DELETE FROM "groceries"
                    WHERE "id" = $1`

    pool.query(queryText, [id]).then((results) => {
        console.log(results.rows);
        res.sendStatus(204)
    })
})

router.put('/buy/:id', (req, res) => {
  let id = req.params.id
  console.log('Purchasing Item number: ', id);
  
  let queryText = `
  UPDATE "groceries"
  SET "purchased" = true
  WHERE "id" = $1;`;

  pool.query(queryText, [id]).then((results) => {
      console.log(results.rows);
      res.sendStatus(204)
  })
})

/*router.put("/clear", (req, res) => {
 
  console.log("Clear cart of all selections");

  const queryText = `
  UPDATE "groceries"
  SET "purchased" = false
  WHERE "purchased" = true;`;

  pool.query(queryText)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
}); */


module.exports = router;