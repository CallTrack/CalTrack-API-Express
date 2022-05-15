const express = require("express");
const router = express.Router();
const defaultUser = require("../../defaultUsers");
const users = require("../../users");
const calculateCalories = require("../functions/calculateCalories");

router.get('/', (req, res) => res.json(users));

router.get('/default/:id', (req, res) => {
    try {
        res.json(defaultUser.filter(user => user.id === parseInt(req.params.id)));
    } catch (error) {
        res.error;   
    }
});

router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400);
    }
});

router.post('/', (req, res) => {
    const { email, name, gender, age, weight, height, activityLevel } = request.payload;
    const id = nanoid(8);

    dailyCalories = calculateCalories(gender, weight, height, age, activityLevel);

    const newUser = {
        id, email, name, gender, age, weight, height, activityLevel, dailyCalories,
    };
    users.push(newUser);

    const found = users.some(user => user.gender === parseInt(req.params.id));
    if (found) {
        res.json({
            status: 'success',
            data: {
                userId: id,
            },
            dailyCalories: dailyCalories,
        });
    } else {
        res.status(500);
    }
});

router.put('/:id', (req, res) => {
    const { userId } = req.params;
    const { name, gender, age, weight, height, activityLevel } = request.payload;
    const index = users.findIndex((user) => user.id === userId);

    dailyCalories = calculateCalories(gender, weight, height, age, activityLevel);

    if (index !== -1) {
        users[index] = {
            ...users[index],
            name,
            gender,
            age,
            weight,
            height,
            activityLevel,
            dailyCalories,
        };

        res.json({
            status: 'success',
            message: 'user berhasil diperbarui',
        })
        .status(200);
    }
    res.json({
        status: 'fail',
        message: 'Gagal memperbarui user. Id tidak ditemukan',
    })
    .status(200);
});



module.exports = router;
