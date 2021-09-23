/*
The Brands APIt
*/
const express = require('express');
const router = express.Router();
const _database = require('../../database');

//Get list of brands
router.get("/", (req, res) => {
    //console.log("Fetching all brands");
    const items = [];
    for (let x = 0; x < _database.length; x++){
        const brand = _database[x].brand_id;
        const dup = items.find(x => x.id === brand);
        if (!dup){
            items.push({
                id: brand,
                name: _database[x].brand_name
            });
        }
    }

    res.send(items);
});

//Get every project of a brand
router.get("/:type", (req, res) => {
    const type = req.params.type;
    const filteredProducts = [];

    for (let x = 0; x < _database.length; x++){
        if (_database[x].brand_id === type){
            filteredProducts.push(_database[x]);
        }
    }

    res.send(filteredProducts)
});

//Export the API
module.exports = router;