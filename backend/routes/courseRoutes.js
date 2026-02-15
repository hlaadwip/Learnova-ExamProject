const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Marketplace / Discovery
router.get('/', courseController.getCourses);
router.post('/', courseController.createCourse);

// My Courses Logic
router.get('/my-courses/:userId', courseController.getMyCourses);
router.post('/enroll', courseController.enrollCourse); 

// Progress Logic
router.put('/update-progress', courseController.updateProgress);
router.post('/toggle-lesson', courseController.toggleLessonStatusApi); 

// Detail & CRUD
router.get('/:id', courseController.getCourseById);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;