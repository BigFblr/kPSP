const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// Получить все предметы
router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).send('Ошибка сервера');
    }
});


// Добавить новый предмет
router.post('/', async (req, res) => {
    const { name, type, groups } = req.body;
    try {
        const newSubject = new Subject({ name, type, groups });
        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).send('Ошибка сервера');
    }
});

// Получить предмет по ID
router.get('/:id', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Предмет не найден' });
        }
        res.json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Обновить предмет по ID
router.put('/:id', async (req, res) => {
    try {
        const { name, type, groups } = req.body;
        const updatedSubject = await Subject.findByIdAndUpdate(
            req.params.id,
            { name, type, groups },
            { new: true }
        );
        if (!updatedSubject) {
            return res.status(404).json({ message: 'Предмет не найден' });
        }
        res.json(updatedSubject);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Удалить предмет по ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
        if (!deletedSubject) {
            return res.status(404).json({ message: 'Предмет не найден' });
        }
        res.json({ message: 'Предмет успешно удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при удалении предмета' });
    }
});

module.exports = router;
