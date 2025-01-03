const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Subject = require('../models/Subject');

// Получение списка студентов
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Получение списка предметов
router.get('/subjects', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;