const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  teacher: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const times = new mongoose.model("Time", timeSchema);

module.exports = times;
