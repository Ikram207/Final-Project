const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['in progress', 'completed'],
    default: 'in progress'
  },
  deadline: Date
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
