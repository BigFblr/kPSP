import React, { useState } from 'react';
import AddStudent from './AddStudent';
import AddSubject from './AddSubject';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const AddPage = () => {
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showSubjectForm, setShowSubjectForm] = useState(false);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Добавление информации
        </Typography>

        {!showStudentForm && !showSubjectForm && (
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title={
                    <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                      Добавить студента
                    </Typography>
                  }
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    onClick={() => setShowStudentForm(true)}
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
                      Добавить дисциплину
                    </Typography>
                  }
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LibraryAddIcon />}
                    onClick={() => setShowSubjectForm(true)}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Открыть форму
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {showStudentForm && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <AddStudent />
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowStudentForm(false)}
                  sx={{ fontWeight: 'bold' }}
                >
                  Скрыть форму
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {showSubjectForm && (
          <Card>
            <CardContent>
              <AddSubject />
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowSubjectForm(false)}
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

export default AddPage;