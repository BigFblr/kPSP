import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Container,
  Paper,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const AddSubject = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [groups, setGroups] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const addSubject = async () => {
        try {
            await axios.post('http://localhost:5000/api/subjects', { name, type, groups: groups.split(',') });
            setSnackbarMessage('Дисциплина успешно добавлен');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setName('');
            setType('');
            setGroups('');
        } catch (error) {
            setSnackbarMessage('Ошибка при добавлении дисциплины');
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
                <Typography variant="h4" gutterBottom>Добавление дисциплины</Typography>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        label="Название"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel>Тип</InputLabel>
                        <Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            label="Тип"
                            required
                        >
                            <MenuItem value="lecture">Лекция</MenuItem>
                            <MenuItem value="lab">Лабораторная работа</MenuItem>
                            <MenuItem value="practice">Практика</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Группы (через запятую)"
                        variant="outlined"
                        value={groups}
                        onChange={(e) => setGroups(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={addSubject} variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
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

export default AddSubject;