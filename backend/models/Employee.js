const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class: String,
  subjects: [String],
  attendance: Number
});

module.exports = mongoose.model('Employee', employeeSchema);
