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
        const results = await db.query("select * from foods");
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
        const results = await db.query("select * from foods where id_food = $1", [req.params.id]);
        res.json(results.rows[0]);
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
        const results = await db.query("select * from foods where name like $1", [searchedField + '%']);
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

// router.post('/', async (req, res) => {
//     const { food } = req.body;
//     const newFood = await pool.query(
//         "INSERT INTO foods (food) VALUES ($1) RETURNING *",
//         [food]
//     );

//     res.json(newFood);
// })

module.exports = router;
