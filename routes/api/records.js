const express = require("express");
const router = express.Router();
const { nanoid } = require('nanoid');
const db = require('../../db');

//Get All Records
router.get('/', (req, res) => {
    const client = db();
    client.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    }); 

    const query = `SELECT * FROM records`;
    client.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(400);
            res.json({
                status: 'fail',
                message: 'gagal mendapatkan semua data record',
            });
        }
        client.end();
        res.json({
            status: 'success',
            recordList: results.rows
        });
    });
});

//Get All User Records
router.get('/:userid', (req, res) => {
    const userId = req.params.userid;
    const client = db();
    client.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    }); 

    const query = `SELECT * FROM records WHERE id_user = $1`;
    client.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400);
            res.json({
                status: 'fail',
                message: 'gagal mendapatkan data record user',
            });
        }
        client.end();
        res.json({
            status: 'success',
            recordList: results.rows
        });
    });
});

//Get Specified User Record
router.get('/:userid/:recordid', (req, res) => {
    const userId = req.params.userid;
    const recordId = req.params.recordid;
    const client = db();
    client.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    }); 
    const query = `SELECT * FROM records WHERE id_user = $1 AND id_record = $2`;
    client.query(query, [userId, recordId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(400);
            res.json({
                status: 'fail',
                message: 'gagal mendapatkan data record',
            });
        }
        client.end();
        res.json(results.rows[0]);
    });
    /*
    const query = `SELECT * FROM records WHERE id_record = $1`;
    client.query(query, [recordId], (err, results1) => {
        if (err) {
            console.error(err);
            res.status(400);
            res.json({
                status: 'fail',
                message: 'gagal mendapatkan data record.',
            });
        }
        const query2 = `SELECT * FROM foods_records WHERE id_foodsrec = $1`;
        client.query(query2, [recordId], (err, results2) => {
            if (err) {
                console.error(err);
                res.status(400);
                res.json({
                    status: 'fail',
                    message: 'gagal mendapatkan data record makanan.',
                });
            }
            const query3 = `SELECT * FROM exercises_records WHERE id_exercisesrec = $1`;
            client.query(query3, [recordId], (err, results3) => {
                if (err) {
                    console.error(err);
                    res.status(400);
                    res.json({
                        status: 'fail',
                        message: 'gagal mendapatkan data record exercise.',
                    });
                }
                client.end();
                res.json({
                    record: results1.rows,
                    foods_records: results2.rows,
                    exercises_records: results3.rows,
                });
            });
        });
    });
    */
});

//Add User New Record
router.post('/:userid', (req, res) => {
    const userId = req.params.userid;
    const date = req.body.date;
    const caloriesIn = req.body.caloriesIn;
    const caloriesBurn = req.body.caloriesBurn;
    const totalCalories = req.body.totalCalories;
    const recordId = nanoid(8);

    const client = db();
    client.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    }); 

    const query = `INSERT INTO records (id_record, id_user, date, calories_in, calories_burn, total_calories)
    VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [recordId, userId, date, caloriesIn, caloriesBurn, totalCalories];
    client.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(400);
            res.json({
                status: 'fail',
                message: 'gagal menambah record',
            });
        }
        client.end();
        res.json({
            status: 'success',
            message: 'record berhasil ditambahkan',
        });
    });
});

//Update User Record
router.put('/:userid/:recordid', (req, res) => {
    const userId = req.params.userid;
    const recordId = req.params.recordid;
    const date = req.body.date;
    const caloriesIn = req.body.caloriesIn;
    const caloriesBurn = req.body.caloriesBurn;
    const totalCalories = req.body.totalCalories;

    const client = db();
    client.connect((err) =>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Database Connected');
    }); 

    const query = `UPDATE records SET date = $1, calories_in = $2, calories_burn = $3, total_calories = $4 
                   WHERE id_record = $5 AND id_user = $6`;
    const values = [date, caloriesIn, caloriesBurn, totalCalories, recordId, userId];
    client.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            res.json({
                status: 'fail',
                message: 'gagal memperbarui record. Id tidak ditemukan',
            })
        }
        client.end();
        res.json({
            status: 'success',
            message: 'record berhasil diperbarui',
        })
    });
});

module.exports = router;