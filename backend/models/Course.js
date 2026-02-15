const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Biology', 'Chemistry', 'Economics', 'Mathematics', 'Physics'],
    required: true 
  },
  mentorName: { type: String, required: true },
  mentorImage: { type: String, default: "" },
  image: { type: String, required: true }, 
  description: { type: String, default: "" }, 
  duration: { type: String, default: "0m" },
  rating: { type: Number, default: 0 },
  isRecommended: { type: Boolean, default: false },
  lessons: [{
    title: { type: String, required: true },
    videoUrl: { type: String, default: "" }, 
    duration: { type: String, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);