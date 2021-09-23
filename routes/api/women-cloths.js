/*
The Cloths API for women cloths
*/
const express = require('express');
const router = express.Router();
const _database = require('../../database');

//Get every product for women
router.get("/", (req, res) => {
    //console.log("Fetch all women clothing");
    const items = [];
    for (let x = 0; x < _database.length; x++){
        if (_database[x].gender === "f"){
            items.push(_database[x]);
        }
    }

    res.send(items);
});

//Get every project for women of a type (shirts, dresses, etc.)
router.get("/:type", (req, res) => {
    //console.log(`Fetch all women clothing of type: ${ type }`);
    const type = req.params.type;
    const items = [];
    for (let x = 0; x < _database.length; x++){
        if (_database[x].gender === "f" && _database[x].type === type){
            items.push(_database[x]);
        }
    }

    res.send(items)
});

//Export the API
module.exports = router;