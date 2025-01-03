import React from 'react';
import { List, ListItem, ListItemText, Checkbox, FormControlLabel } from '@mui/material';

const StudentList = ({ students, attendanceRecords, handleAttendanceChange }) => {
  return (
    <List sx={{ mt: 2 }}>
      {students.map((student) => (
        <ListItem key={student._id}>
          <ListItemText
            primary={`${student.firstName} ${student.lastName}`}
            secondary={`Группа: ${student.group}`}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={attendanceRecords[student._id] || false}
                onChange={(e) => handleAttendanceChange(student._id, e.target.checked)}
              />
            }
            label="Присутствовал"
          />
        </ListItem>
      ))}
    </List>
  );
};

export default StudentList;