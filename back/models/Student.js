const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    patronymic: { type: String, required: true },
    group: { type: String, required: true } 
});

module.exports = mongoose.model('Student', studentSchema);