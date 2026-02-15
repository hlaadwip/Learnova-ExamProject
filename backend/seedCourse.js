const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const categories = ['Biology', 'Chemistry', 'Economics', 'Mathematics', 'Physics'];

const generateCourses = () => {
  const allCourses = [];
  categories.forEach(cat => {
    for (let i = 1; i <= 5; i++) { 
      allCourses.push({
        title: `${cat} Made Easy: Chapter ${i}`,
        category: cat,
        mentorName: `Expert ${cat} Teacher`,
        mentorImage: "https://via.placeholder.com/100",
        image: "https://via.placeholder.com/150", 
        description: `Deep dive into ${cat} Chapter ${i}. This module is designed for Grade 12 final exam preparation.`,
        duration: "3h 55m",
        rating: 4.7,
        isRecommended: i <= 3 ? true : false,
        lessons: [
          { title: "Part A: Introduction", videoUrl: "vid_01", duration: "10:00" },
          { title: "Part B: Core Concept", videoUrl: "vid_02", duration: "20:00" },
          { title: "Part C: Summary", videoUrl: "vid_03", duration: "15:00" }
        ]
      });
    }
  });
  return allCourses;
};

const seedDB = async () => {
  try {
    await Course.deleteMany(); 
    const createdCourses = await Course.insertMany(generateCourses());
    console.log(`DATABASE SUCCESS: ${createdCourses.length} courses uploaded.`);
    process.exit();
  } catch (err) {
    console.error(`DATABASE ERROR: ${err.message}`);
    process.exit(1);
  }
};

seedDB();