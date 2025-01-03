import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EventNoteIcon from '@mui/icons-material/EventNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SubjectList from './SubjectList';
import AttendanceMark from './AttendanceMark';
import AttendanceView from './AttendanceView';
import { fetchSubjects } from '../../api/attendanceApi';
import { Button } from '@mui/material';

const AttendanceForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [date, setDate] = useState('');
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [viewMode, setViewMode] = useState(null); // 'mark' или 'view'
  const [isViewModeOpen, setIsViewModeOpen] = useState(false); // Состояние для отображения кнопок
  const navigate = useNavigate();

  // Получение списка предметов
  useEffect(() => {
    fetchSubjects(setSubjects);
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setIsViewModeOpen(true);
  };

  const handleCloseViewMode = () => {
    setViewMode(null);
    setIsViewModeOpen(false);
    setSelectedSubject(null);
    setDate('');
    setStudents([]);
    setAttendanceRecords({});
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Посещаемость
        </Typography>

        {!isViewModeOpen && (
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title={
                    <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                      Отметить посещаемость
                    </Typography>
                  }
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EventNoteIcon />}
                    onClick={() => handleViewModeChange('mark')}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Открыть форму
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title={
                    <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                      Просмотреть посещаемость
                    </Typography>
                  }
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewModeChange('view')}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Открыть форму
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {isViewModeOpen && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              {viewMode === 'mark' && (
                <AttendanceMark
                  subjects={subjects}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                  date={date}
                  setDate={setDate}
                  students={students}
                  setStudents={setStudents}
                  attendanceRecords={attendanceRecords}
                  setAttendanceRecords={setAttendanceRecords}
                  navigate={navigate}
                />
              )}

              {viewMode === 'view' && (
                <AttendanceView
                  subjects={subjects}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                  date={date}
                  setDate={setDate}
                  students={students}
                  setStudents={setStudents}
                  attendanceRecords={attendanceRecords}
                  setAttendanceRecords={setAttendanceRecords}
                />
              )}
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCloseViewMode}
                  sx={{ fontWeight: 'bold' }}
                >
                  Скрыть форму
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default AttendanceForm;