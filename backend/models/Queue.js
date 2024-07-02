const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  clinicCode: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("Queue", queueSchema);
