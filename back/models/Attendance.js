const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  date: { type: Date, required: true },
  attendance: { type: Object, required: true }
});

module.exports = mongoose.model('Attendance', attendanceSchema);