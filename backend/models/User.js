const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: [true, "Full name is required"] 
  },
  email: { 
    type: String, 
    required: [true, "Email address is required"], 
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  profileImage: { type: String, default: "" },
  // Progress tracking
  myCourses: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    status: { type: String, enum: ['ongoing', 'complete'], default: 'ongoing' },
    completedLessons: [String] 
  }]
}, { timestamps: true });

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// FEncrypt password menggunakan pola Async-Await 
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);