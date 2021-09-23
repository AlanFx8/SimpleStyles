/*
The Cloths API for any cloths request
*/
const express = require('express');
const router = express.Router();
const _database = require('../../database');

//Get every item of cloths
router.get("/", (req, res) => {
    //console.log("Fetch all clothing");
    res.send(_database);
});

//Get every project of a type (shirts, dresses, etc.)
router.get("/:type", (req, res) => {
    const type = req.params.type;
    const filteredProducts = [];

    for (let x = 0; x < _database.length; x++){
        if (_database[x].type === type){
            filteredProducts.push(_database[x]);
        }
    }

    res.send(filteredProducts)
});

//Export the API
module.exports = router;