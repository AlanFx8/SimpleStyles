/* The Product API - It fetches a product based on its ID */
const express = require('express');
const router = express.Router();
const _database = require('../../database');

router.get("/:id", (req, res) => {
    const id = req.params.id;
    //console.log(`Fetching product with id of: ${id}`);
    const product = _database.find(x => x.id.toString() === id.toString());
    res.send((product !== "") ? product: null);
});

//Export the API
module.exports = router;