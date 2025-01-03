import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import AttendanceForm from './components/atten/AttendanceForm';
import PrivateRoute from './components/PrivateRoute';
import { Container, AppBar, Toolbar, Button, styled, IconButton } from '@mui/material'; // Удален Typography
import AddPage from './components/add/AddPage';
import EditStudent from './components/list/EditStudent';
import EditSubject from './components/list/EditSubject';
import ListsPage from './components/list/ListsPage';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// Стилизованная кнопка для меню
const MenuButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  fontWeight: 'bold',
  fontSize: '1rem',
  textTransform: 'none',
  borderRadius: '10px',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
}));

const AppContent = () => {
  const location = useLocation(); // Получаем текущий маршрут

  // Определяем, нужно ли показывать меню
  const showMenu = !['/', '/login', '/register'].includes(location.pathname);

  return (
    <>
      {showMenu && (
        <AppBar
          position="static"
          sx={{
            background: 'linear-gradient(45deg, #3f51b5, #2196f3)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Toolbar>
            <MenuButton
              color="inherit"
              component={Link}
              to="/attendance"
              startIcon={<EventNoteIcon />}
              sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Посещаемость
            </MenuButton>
            <MenuButton
              color="inherit"
              component={Link}
              to="/add"
              startIcon={<GroupAddIcon />}
              sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Добавление
            </MenuButton>
            <MenuButton
              color="inherit"
              component={Link}
              to="/lists"
              startIcon={<ListAltIcon />}
              sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Списки
            </MenuButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/"
              sx={{ ml: 'auto' }}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/attendance" element={
            <PrivateRoute>
              <AttendanceForm />
            </PrivateRoute>
          } />
          <Route path="/add" element={
            <PrivateRoute>
              <AddPage />
            </PrivateRoute>
          } />
          <Route path="/edit-student/:id" element={
            <PrivateRoute>
              <EditStudent />
            </PrivateRoute>
          } />
          <Route path="/edit-subject/:id" element={
            <PrivateRoute>
              <EditSubject />
            </PrivateRoute>
          } />
          <Route path="/lists" element={
            <PrivateRoute>
              <ListsPage />
            </PrivateRoute>
          } />
        </Routes>
      </Container>
    </>
  );
};

export default App;