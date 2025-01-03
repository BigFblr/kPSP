const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Замените на ваш секретный ключ

// Регистрация пользователя
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Проверяем, существует ли уже пользователь с таким именем
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
        return res.status(400).json({ message: 'Имя пользователя уже занято' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Пользователь зарегистрирован' });
});

// Вход пользователя
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Неверные учетные данные' });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;