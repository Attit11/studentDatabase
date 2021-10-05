const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    // require: true,
  },
  lastName: {
    type: String,
    trim: true,
    // require: true,
  },
  class: {
    type: Number,
    trim: true,
    // require: true,
  },
  rollNo: {
    type: Number,
    trim: true,
    // require: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
