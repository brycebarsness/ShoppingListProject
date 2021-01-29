const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
//adds one item
router.post('/', (req, res) => {
  const item = req.body
  const queryText = `INSERT INTO "groceries" ("name", "quantity", "unit") VALUES ($1, $2, $3);`;

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
//gets all items
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

//gets a single item
router.get('/:id', (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM "groceries" WHERE "id" ='${id}'`
  pool.query(query).then(result => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(`error getting the one grocery item: ${error}`);
    res.sendStatus(500);
  });
})

//deletes one item
router.delete('/delete:id', (req, res) => {
  let id = req.params.id;
  console.log('Deleting item number', id);
  let queryText = `DELETE FROM "groceries"
                    WHERE "id" = $1`

  pool.query(queryText, [id]).then((results) => {
    console.log(results.rows);
    res.sendStatus(204)
  })
})
//sets one item as purchased
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
//updates only one grocery item
router.put('/update/:id', (req, res) => {
  let id = req.params.id;
  let body = req.body
  console.log('ID:', id);
  let name = body.name;
  console.log('name:', name);
  let quantity = body.quantity;
  console.log('quantity:', quantity);
  let unit = body.unit;
  console.log('unit:', unit);
  console.log('updating Item number: ', id);
  let queryText = `
  UPDATE "groceries" SET "name" = '${name}', "quantity" = ${quantity}, "unit" = '${unit}' WHERE "id" = ${id};`;
  pool.query(queryText).then((results) => {
    console.log(results.rows);
    res.sendStatus(204)
  }).catch((err) => {
    console.log(`Error editing one item query ${queryText}`, err);
    res.sendStatus(500);
  });
})

//resets all item to not purchased
router.put("/reset", (req, res) => {
  console.log("Reset shopping list");
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
});
//deletes all items from the database
router.delete("/clear", (req, res) => {
  console.log("Clear shopping history");
  const queryText = `DELETE FROM "groceries";`;
  pool
    .query(queryText)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});


module.exports = router;