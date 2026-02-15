const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  date: { 
    type: Date, 
    required: [true, "Schedule date is required"] 
  },
  topic: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['ongoing', 'complete'], 
    default: 'ongoing' 
  }, 
  progress: { 
    type: Number, 
    default: 0 
  }, 
  reminderSet: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);