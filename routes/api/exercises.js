const express = require("express");
const router = express.Router();
// const foods = require("../../foods");
const database = require("../../db");

router.get('/', async (req, res) => {
    
    const db = database();
    db.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    }); 
    
    try {
        const results = await db.query("select * from exercises");
        res.json(results.rows);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
});

router.get('/:id', async (req, res) => {
    
    const db = database();
    db.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    });
    
    try {
        const results = await db.query("select * from exercises where id_exercise = $1", [req.params.id]);
        res.json(results.rows);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
});

router.get('/search/:name', async (req, res) => {
    const searchedField = req.params.name;
    console.log(searchedField);
    
    const db = database();
    db.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    });
    
    try {
        const results = await db.query("select * from exercises where name like $1", [searchedField + '%']);
        res.json(results.rows);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
    // res.send(foods.find({name:{$regex: searchedField, $option: '$i'}}));
    // const matchingName = foods.filter(food => {
    //     return food.name === searchedField;
    // });
    // res.send(matchingName); 
});

module.exports = router;
