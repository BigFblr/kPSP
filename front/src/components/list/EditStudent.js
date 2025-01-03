import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const { state } = useLocation(); // Получаем данные из маршрута
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    group: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (state && state.student) {
      setStudent(state.student);
    } else {
      const fetchStudent = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/students/${id}`);
          setStudent(response.data);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setSnackbarMessage('Студент не найден');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
          } else {
            console.error('Ошибка при загрузке студента:', error);
            setSnackbarMessage('Ошибка при загрузке данных студента');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
          }
        }
      };
      fetchStudent();
    }
  }, [id, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, student);
      setSnackbarMessage('Данные студента успешно обновлены');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/lists'), 1000);
    } catch (error) {
      console.error('Ошибка при редактировании студента:', error);
      setSnackbarMessage('Ошибка при обновлении данных студента');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="EditStudent">
      <Typography variant="h4" gutterBottom>
        Редактировать студента
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя"
          name="firstName"
          value={student.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Фамилия"
          name="lastName"
          value={student.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Отчество"
          name="patronymic"
          value={student.patronymic}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Группа"
          name="group"
          value={student.group}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditStudent;