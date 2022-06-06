const express = require("express");
const router = express.Router();
const { nanoid } = require('nanoid');
const defaultUser = require("../../defaultUsers");
const users = require("../../users");
const calculateCalories = require("../functions/calculateCalories");
const db = require('../../db');

//Get All Users
router.get('/', (req, res) => {
    const client = db();
    client.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    }); 

    const query = `SELECT * FROM users`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(400);
        }
        client.end();
        res.json(results.rows);
    });
});

//Get Specified User
router.get('/:email', (req, res) => {
    const email = req.params.email;
    const client = db();
    client.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    }); 

    const query = `SELECT * FROM users WHERE email = $1`;
    client.query(query, [email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400);
        }
        client.end();
        res.json(results.rows[0]);
    });
});

//Add New User
router.post('/', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const gender = req.body.gender;
    const age = req.body.age;
    const weight = req.body.weight;
    const height = req.body.height;
    const activityLevel = req.body.activityLevel;
    const id = nanoid(8);

    const dailyCalories = Math.round(calculateCalories(gender, weight, height, age, activityLevel));

    const client = db();
    client.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    }); 

    const query = `INSERT INTO users (id_user, email, name, gender, age, weight, height, activity_level, daily_calories)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [id, email, name, gender, age, weight, height, activityLevel, dailyCalories];
    client.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(400);
            res.json({
                status: 'fail',
                message: 'gagal menambah user',
            });
        }
        client.end();
        res.json({
            status: 'success',
            message: 'user berhasil ditambahkan',
            data: {
                userId: id,
                dailyCalories: dailyCalories,
            },
        });
    });
});

//Update User
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const gender = req.body.gender;
    const age = req.body.age;
    const weight = req.body.weight;
    const height = req.body.height;
    const activityLevel = req.body.activityLevel;

    const client = db();
    client.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    }); 

    const dailyCalories = Math.round(calculateCalories(gender, weight, height, age, activityLevel));

    const query = `UPDATE users SET name = $1, gender = $2, age = $3, weight = $4, height = $5, activity_level = $6,
                   daily_calories = $7 WHERE id_user = $8`;
    const values = [name, gender, age, weight, height, activityLevel, dailyCalories, id];

    client.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(400);
            res.json({
                status: 'fail',
                message: 'gagal memperbarui user. Id tidak ditemukan',
            })
        }
        client.end();
        res.json({
            status: 'success',
            message: 'user berhasil diperbarui',
        })
    });
});

module.exports = router;