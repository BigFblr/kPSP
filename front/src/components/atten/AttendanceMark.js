import axios from 'axios';
import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import StudentList from './StudentList';
import SubjectList from './SubjectList';

const AttendanceMark = ({
  subjects,
  selectedSubject,
  setSelectedSubject,
  date,
  setDate,
  students,
  setStudents,
  attendanceRecords,
  setAttendanceRecords,
  navigate,
}) => {
  const [showStudentList, setShowStudentList] = useState(false); // Состояние для отображения списка студентов
  const [openSnackbar, setOpenSnackbar] = useState(false); // Состояние для отображения уведомления
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Текст уведомления
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Тип уведомления (success или error)

  const fetchStudents = async () => {
    // Проверяем, выбрана ли дисциплина и дата
    if (!selectedSubject || !date) {
      setSnackbarMessage('Выберите дату');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
  
    try {
      // Отправляем запрос на сервер для получения студентов по группе
      const response = await axios.get('http://localhost:5000/api/attendance', {
        params: {
          subjectId: selectedSubject._id, // ID выбранной дисциплины
          date, // Выбранная дата
        },
      });
  
      // Обновляем состояние студентов
      setStudents(response.data.students || []); // Список студентов
      const attendanceRecords = response.data.attendance || {};
      setAttendanceRecords(attendanceRecords);
      setShowStudentList(true); // Показываем список студентов
    } catch (error) {
      // Обрабатываем ошибку
      console.error('Ошибка при получении студентов:', error);
      setSnackbarMessage('Ошибка при получении данных о студентах');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setStudents([]); // Очищаем список студентов в случае ошибки
    }
  };

  const saveAttendance = async () => {
    // Проверяем, есть ли данные о посещаемости
    if (Object.keys(attendanceRecords).length === 0) {
      setSnackbarMessage('Нет данных о посещаемости для сохранения');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
  
    try {
      // Отправляем данные на сервер
      const response = await axios.put('http://localhost:5000/api/attendance', {
        subjectId: selectedSubject._id, // ID выбранной дисциплины
        date, // Выбранная дата
        attendance: attendanceRecords, // Данные о посещаемости
      });
  
      // Обрабатываем успешный ответ
      if (response.status === 200) {
        setSnackbarMessage('Посещаемость успешно сохранена!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        // Очищаем состояние или перенаправляем пользователя
        setAttendanceRecords({});
        setStudents([]);
        setSelectedSubject(null);
        setDate('');
        setShowStudentList(false); // Скрываем список студентов
      }
    } catch (error) {
      // Обрабатываем ошибку
      console.error('Ошибка при сохранении посещаемости:', error);
      setSnackbarMessage('Ошибка при сохранении посещаемости');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card className="Card">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SubjectList subjects={subjects} setSelectedSubject={setSelectedSubject} />
          </Grid>

          {selectedSubject && (
  <>
    <Grid item xs={12} md={6}>
      <TextField
        label="Дата"
        variant="outlined"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      </Grid>
    <Grid item xs={12} md={6}>
      <Button
        onClick={fetchStudents}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ padding: '15px 16px' }}
      >
        Получить список студентов
      </Button>
    </Grid>
  </>
)}

          {showStudentList && (
            <Grid item xs={12}>
              <StudentList
                students={students}
                attendanceRecords={attendanceRecords}
                handleAttendanceChange={(studentId, isPresent) => {
                  setAttendanceRecords((prev) => ({
                    ...prev,
                    [studentId]: isPresent,
                  }));
                }}
              />
            </Grid>
          )}

          {showStudentList && (
            <Grid item xs={12}>
              <Button
                onClick={saveAttendance}
                variant="contained"
                color="primary"
                fullWidth
              >
                Сохранить посещаемость
              </Button>
            </Grid>
          )}
        </Grid>
      </CardContent>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AttendanceMark;