/*
The Cloths API for men cloths
*/
const express = require('express');
const router = express.Router();
const _database = require('../../database');

//Get every product for men
router.get("/", (req, res) => {
    //console.log("Fetch all men clothing");
    const items = [];
    for (let x = 0; x < _database.length; x++){
        if (_database[x].gender === "m"){
            items.push(_database[x]);
        }
    }

    res.send(items);
});

//Get every project for men of a type (shirts, dresses, etc.)
router.get("/:type", (req, res) => {
    //console.log(`Fetch all men clothing of type: ${ type }`);
    const type = req.params.type;
    const items = [];
    for (let x = 0; x < _database.length; x++){
        if (_database[x].gender === "m" && _database[x].type === type){
            items.push(_database[x]);
        }
    }

    res.send(items)
});

//Export the API
module.exports = router;