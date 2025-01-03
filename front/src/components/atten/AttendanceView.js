import axios from 'axios';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Grid, TextField, Button, List, ListItem, ListItemText, Typography, Snackbar, Alert } from '@mui/material';
import SubjectList from './SubjectList';

const AttendanceView = ({
  subjects,
  selectedSubject,
  setSelectedSubject,
  date,
  setDate,
  students,
  setStudents,
  attendanceRecords,
  setAttendanceRecords,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Состояние для отображения уведомления
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Текст уведомления
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Тип уведомления (success или error)

  const fetchStudents = async () => {
    if (!selectedSubject || !date) {
      setSnackbarMessage('Выберите дату');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/attendance/v', {
        params: {
          subjectId: selectedSubject._id,
          date,
        },
      });

      setStudents(response.data || []);
      const initialAttendance = {};
      response.data.forEach((student) => {
        initialAttendance[student._id] = student.isPresent; // Используем isPresent из ответа сервера
      });
      setAttendanceRecords(initialAttendance);
      setShowStudentList(true);
    } catch (error) {
      console.error('Ошибка при получении студентов:', error);
      alert('Ошибка при получении данных о студентах');
      setStudents([]);
    }
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SubjectList
              subjects={subjects}
              selectedSubject={selectedSubject}
              setSelectedSubject={(subject) => {
                setSelectedSubject(subject);
                setShowDatePicker(true);
                setShowStudentList(false);
              }}
            />
          </Grid>

          {showDatePicker && (
            <>
              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <TextField
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  label="Выберите дату"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                <Button 
                variant="contained" 
                fullWidth
                onClick={fetchStudents}
                sx={{ padding: '15px 16px' }}
                >
                  Получить студентов
                </Button>
              </Grid>
            </>
          )}

          {showStudentList && (
            <Grid item xs={12}>
              <List>
                {students.map((student) => (
                  <ListItem key={student._id}>
                    <ListItemText
                      primary={`${student.firstName} ${student.lastName}`}
                      secondary={`Группа: ${student.group}`}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {attendanceRecords[student._id] ? 'Присутствовал' : 'Отсутствовал'}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AttendanceView;