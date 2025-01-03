import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Snackbar, Alert, Container, Paper, Box } from '@mui/material';

const AddStudent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [group, setGroup] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const addStudent = async () => {
        try {
            await axios.post('http://localhost:5000/api/students', { firstName, lastName, patronymic, group });
            setSnackbarMessage('Студент успешно добавлен');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setFirstName('');
            setLastName('');
            setPatronymic('');
            setGroup('');
        } catch (error) {
            setSnackbarMessage('Ошибка при добавлении студента');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>Добавление студента</Typography>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        label="Имя"
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Фамилия"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Отчество"
                        variant="outlined"
                        value={patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Группа"
                        variant="outlined"
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={addStudent} variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
                        Добавить
                    </Button>
                </Box>
            </Paper>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                   {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AddStudent;