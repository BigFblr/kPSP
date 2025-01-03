import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Snackbar, Alert, Container, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // true для входа, false для регистрации
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            setSnackbarMessage('Пользователь успешно зарегистрирован');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setIsLogin(true); // Переключаемся на форму входа
        } catch (error) {
            setSnackbarMessage('Ошибка регистрации');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token); // Сохраняем токен
            setSnackbarMessage('Вход выполнен успешно');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            navigate('/attendance'); // Перенаправляем на страницу посещаемости
        } catch (error) {
            setSnackbarMessage('Ошибка входа');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>{isLogin ? 'Вход' : 'Регистрация'}</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        label="Имя пользователя"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    <Button onClick={() => setIsLogin(!isLogin)} color="secondary" fullWidth>
                        {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
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

export default AuthForm;