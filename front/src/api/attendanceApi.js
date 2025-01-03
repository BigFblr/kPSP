import axios from 'axios';

export const fetchSubjects = async (setSubjects) => {
  try {
    const response = await axios.get('http://localhost:5000/api/subjects');
    setSubjects(response.data || []);
  } catch (error) {
    console.error('Ошибка при получении дисциплин:', error);
    setSubjects([]);
  }
};

export const fetchStudents = async (selectedSubject, date, setStudents, setAttendanceRecords) => {
  try {
    const response = await axios.get('http://localhost:5000/api/attendance', {
      params: { subjectId: selectedSubject._id, date },
    });
    setStudents(response.data?.students || []);
    const initialAttendance = {};
    response.data?.attendance?.forEach((record) => {
      initialAttendance[record.studentId] = record.isPresent;
    });
    setAttendanceRecords(initialAttendance);
  } catch (error) {
    console.error('Ошибка при получении студентов:', error);
    setStudents([]);
  }
};

export const saveAttendance = async (selectedSubject, date, attendanceRecords, navigate) => {
  try {
    await axios.post('http://localhost:5000/api/attendance', {
      subjectId: selectedSubject._id,
      date,
      attendance: attendanceRecords,
    });
    navigate('/attendance');
  } catch (error) {
    console.error('Ошибка при сохранении посещаемости:', error);
  }
};