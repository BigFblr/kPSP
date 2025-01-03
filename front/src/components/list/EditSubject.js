import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditSubject = () => {
    const { id } = useParams(); // Получаем ID предмета из URL
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [groups, setGroups] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Загрузка данных предмета по ID
    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/subjects/${id}`);
                const subject = response.data;
                setName(subject.name);
                setType(subject.type);
                setGroups(subject.groups.join(',')); // Преобразуем массив групп в строку
            } catch (error) {
                console.error('Ошибка при загрузке данных предмета:', error);
                setSnackbarMessage('Ошибка при загрузке данных предмета');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        };
        fetchSubject();
    }, [id]);

    // Сохранение изменений
    const saveChanges = async () => {
        try {
            await axios.put(`http://localhost:5000/api/subjects/${id}`, {
                name,
                type,
                groups: groups.split(','), // Преобразуем строку обратно в массив
            });
            setSnackbarMessage('Изменения успешно сохранены');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setTimeout(() => navigate('/lists'), 1000); // Перенаправляем на страницу списков через 1 секунду
        } catch (error) {
            console.error('Ошибка при сохранении изменений:', error);
            setSnackbarMessage('Ошибка при сохранении изменений');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    // Закрытие Snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Редактирование предмета
            </Typography>
            <TextField
                label="Название предмета"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Тип предмета</InputLabel>
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    label="Тип предмета"
                    required
                >
                    <MenuItem value="lecture">Лекция</MenuItem>
                    <MenuItem value="lab">Лабораторная работа</MenuItem>
                    <MenuItem value="practice">Практика</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Группы"
                variant="outlined"
                value={groups}
                onChange={(e) => setGroups(e.target.value)}
                required
                fullWidth
                margin="normal"
                helperText="Введите ID групп через запятую "
            />
            <Button variant="contained" color="primary" onClick={saveChanges}>
                Сохранить изменения
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default EditSubject;