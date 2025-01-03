const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Subject = require('../models/Subject');
const Student = require('../models/Student');

router.get('/v', async (req, res) => {
  const { subjectId, date } = req.query;

  try {
    // Находим дисциплину по ID
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Предмет не найден' });
    }

    // Получаем студентов, которые относятся к группам предмета
    const students = await Student.find({ group: { $in: subject.groups } });

    // Получаем записи о посещаемости для данной дисциплины и даты
    const attendanceRecords = await Attendance.find({ subjectId, date });

    // Формируем ответ с полем `group` и отметкой о посещаемости
    const result = students.map((student) => {
      const record = attendanceRecords.find((record) => record.attendance[student._id]);
      return {
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        group: student.group, // Убедитесь, что это поле включено
        isPresent: record ? record.attendance[student._id] : false,
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Ошибка при получении студентов:', error);
    res.status(500).json({ message: 'Ошибка при получении студентов', error });
  }
});

router.get('/', async (req, res) => {
  const { subjectId, date } = req.query;

  try {
    // Находим дисциплину по ID
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Предмет не найден' });
    }

    // Получаем студентов, которые относятся к группам предмета
    const students = await Student.find({ group: { $in: subject.groups } });

    // Получаем записи о посещаемости для данной дисциплины и даты
    let attendanceRecords;
    try {
      attendanceRecords = await Attendance.findOne({ subjectId, date });
    } catch (error) {
      console.error('Ошибка при получении записи о посещаемости:', error);
      return res.status(500).json({ message: 'Ошибка при получении записи о посещаемости' });
    }

    if (!attendanceRecords) {
      // Если запись о посещаемости не существует, создаем новую
      try {
        attendanceRecords = new Attendance({ subjectId, date, attendance: {} });
        await attendanceRecords.save();
      } catch (error) {
        console.error('Ошибка при создании новой записи о посещаемости:', error);
        return res.status(500).json({ message: 'Ошибка при создании новой записи о посещаемости' });
      }
    }

    // Формируем ответ с полем `group` и отметкой о посещаемости
    const result = students.map((student) => {
      const isPresent = attendanceRecords.attendance[student._id] || false;
      return {
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        group: student.group, // Убедитесь, что это поле включено
        isPresent,
      };
    });

    res.json({ students: result, attendance: attendanceRecords.attendance });
  } catch (error) {
    console.error('Ошибка при получении студентов:', error);
    res.status(500).json({ message: 'Ошибка при получении студентов', error });
  }
});


// Обновление данных о посещаемости
router.put('/', async (req, res) => {
  const { subjectId, date , attendance } = req.body;

  try {
    // Находим запись о посещаемости
    let attendanceRecord = await Attendance.findOne({ subjectId, date });

    // Если запись не существует, создаем новую
    if (!attendanceRecord) {
      attendanceRecord = new Attendance({ subjectId, date, attendance: {} });
    }

    // Обновляем статус посещаемости для всех студентов
    attendanceRecord.attendance = attendance;

    // Сохраняем изменения в базе данных
    await attendanceRecord.save();

    res.status(200).json({ message: 'Посещаемость успешно обновлена' });
  } catch (error) {
    console.error('Ошибка при обновлении посещаемости:', error);
    res.status(500).json({ message: 'Ошибка при обновлении посещаемости' });
  }
});

// Сохранить посещаемость
router.post('/', async (req, res) => {
  const { subjectId, date, attendance } = req.body;
  try {
    const attendanceRecord = new Attendance({ subjectId, date, attendance });
    await attendanceRecord.save();
    res.status(201).json(attendanceRecord);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при сохранении посещаемости', error });
  }
});

module.exports = router;