const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['lecture', 'lab', 'practice'], required: true },
    groups: [{ type: String }] // Список групп, которые посещают этот предмет
});

module.exports = mongoose.model('Subject', subjectSchema);