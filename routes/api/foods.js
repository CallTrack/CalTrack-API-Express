const express = require("express");
const router = express.Router();
// const foods = require("../../foods");
// const db = require("../../db");

router.get('/', async (req, res) => {
    try {
        const results = await db.query("select * from foods");
        console.log(results);
        res.json({
            status: 'success',
            results: results.rows.length,
            data: {
                foods: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const results = await db.query("select * from foods where id = $1", [req.params.id]);
        res.json({
            status: 'success',
            data: {
                foods: results,
            }
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/', async (req, res) => {
    const searchedField = req.query.name;
    console.log(searchedField);
    try {
        const results = await db.query("select * from foods where name like '$1'", [searchedField]);
        res.json({
            status: 'success',
            data: {
                foods: results.rows,
            }
        })
    } catch (err) {
        console.log(err);
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
