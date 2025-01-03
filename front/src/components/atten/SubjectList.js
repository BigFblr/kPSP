import React, { useState } from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, Button} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';

const SubjectList = ({ subjects, setSelectedSubject }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  return (
    <Card>
      <CardHeader title="Выберите дисциплину" />
      <CardContent>
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
             boxShadow: selectedSubjectId === subject._id ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
             transform: selectedSubjectId === subject._id ? 'translateY(-2px)' : 'translateY(0)',
             transition: selectedSubjectId === subject._id ? 'transform 0.2s, box-shadow 0.2s' : 'none',
           }}
         >
           <ListItemText 
           primary={subject.name}
           secondary={`Тип: ${subject.type}`} 
           />
           <Button
             onClick={() => {
               setSelectedSubject(subject);
               setSelectedSubjectId(subject._id);
             }}
             variant="contained"
             color="primary"
             startIcon={<EventNoteIcon />}
           >
             Выбрать
           </Button>
         </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default SubjectList;