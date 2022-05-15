const express = require("express");
const router = express.Router();
const foods = require("../../foods");

router.get('/', (req, res) => res.json(foods));

router.get('/:id', (req, res) => {
    const found = foods.some(food => food.id === parseInt(req.params.id));

    if (found) {
        res.json(foods.filter(food => food.id === parseInt(req.params.id)));
    } else {
        // res.status(400).send('<h1>Bad request</h1>')
        res.status(400).json({ msg: `No food with the id of ${req.params.id}`})
    }
})

router.post('/', (req, res) => {
    res.send(req.body)
})

module.exports = router;