import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Paper,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListsPage = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Загрузка списка студентов
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке студентов:', error);
      }
    };
    fetchStudents();
  }, []);

  // Загрузка списка предметов
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке предметов:', error);
      }
    };
    fetchSubjects();
  }, []);

  // Удаление студента
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(students.filter((student) => student._id !== id)); // Обновляем состояние
    } catch (error) {
      console.error('Ошибка при удалении студента:', error);
    }
  };

  // Удаление предмета
  const deleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`);
      setSubjects(subjects.filter((subject) => subject._id !== id)); // Обновляем состояние
    } catch (error) {
      console.error('Ошибка при удалении предмета:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Списки
        </Typography>

        {/* Список студентов */}
        <Paper
          elevation={3}
          sx={{
            mb: 3,
            p: 2,
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            Студенты
          </Typography>
          <List>
            {students.map((student) => (
              <ListItem
                key={student._id}
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  },
                }}
              >
                <ListItemText
                  primary={`${student.firstName} ${student.lastName} ${student.patronymic}`}
                  secondary={`Группа: ${student.group}`}
                />
                <IconButton
                  component={Link}
                  to={{
 pathname: `/edit-student/${student._id}`,
                    state: { student }, // Передаем данные студента
                  }}
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => deleteStudent(student._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Список предметов */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            Дисциплины
          </Typography>
          <List>
            {subjects.map((subject) => (
              <ListItem
                key={subject._id}
                sx={{
                  mb: 1,
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  },
                }}
              >
                <ListItemText
                  primary={subject.name}
                  secondary={`Тип: ${subject.type}`}
                />
                <IconButton
                  component={Link}
                  to={{
                    pathname: `/edit-subject/${subject._id}`,
                    state: { subject }, // Передаем данные предмета
                  }}
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => deleteSubject(subject._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default ListsPage;