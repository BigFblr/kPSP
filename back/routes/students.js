const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Получить всех студентов
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при получении списка студентов' });
    }
});

// Добавить нового студента
router.post('/', async (req, res) => {
    const { firstName, lastName, patronymic, group } = req.body;

    // Валидация данных
    if (!firstName || !lastName || !patronymic || !group) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
        const newStudent = new Student({ firstName, lastName, patronymic, group });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при добавлении студента' });
    }
});

// Получить студента по ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Студент не найден' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при получении студента' });
    }
});

// Обновить студента по ID
router.put('/:id', async (req, res) => {
    const { firstName, lastName, patronymic, group } = req.body;

    // Валидация данных
    if (!firstName || !lastName || !patronymic || !group) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, patronymic, group },
            { new: true } // Возвращает обновленный документ
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Студент не найден' });
        }
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при обновлении студента' });
    }
});

// Удалить студента по ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Студент не найден' });
        }
        res.json({ message: 'Студент успешно удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера при удалении студента' });
    }
});

module.exports = router;