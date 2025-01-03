const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const studentRoutes = require('./routes/students');
const subjectRoutes = require('./routes/subjects');
const attendanceRoutes = require('./routes/attendance');

app.use(cors());
app.use(bodyParser.json());

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/uni', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Подключено к MongoDB'))
    .catch(err => console.error('Ошибка подключения к MongoDB', err));

// Использование маршрутов
app.use('/api/auth', authRouter);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/attendance', attendanceRoutes);

app.listen(5000, () => {
    console.log('Сервер запущен на порту 5000');
});