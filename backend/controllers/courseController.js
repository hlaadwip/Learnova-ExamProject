const Course = require('../models/Course');
const User = require('../models/User');
const Schedule = require('../models/Schedule');

const calculateStats = (lessons = [], completedIds = []) => {
  const total = lessons.length;
  const completedCount = completedIds.length;
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const isComplete = progress === 100;

  // Cari lesson pertama yang belum ada di daftar completed
  const nextLesson = lessons.find(l => !completedIds.includes(l._id.toString()));
  const nextTopic = nextLesson ? nextLesson.title : "All Lessons Completed";

  return {
    progress,
    nextTopic,
    status: isComplete ? 'complete' : 'ongoing'
  };
};

// GET ALL COURSES (Marketplace/Discover)

exports.getCourses = async (req, res) => {
  try {
    const { category, recommended, search, limit, userId } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (recommended === 'true' && (category === 'All' || !category)) {
      query.isRecommended = true;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Filter: Jangan tampilin kelas yang sudah di-enroll oleh user
    if (userId && userId !== 'null' && userId !== '') {
      const userSchedules = await Schedule.find({ userId });
      if (userSchedules.length > 0) {
        const enrolledCourseIds = userSchedules.map(s => s.courseId);
        query._id = { $nin: enrolledCourseIds };
      }
    }

    let finalLimit = limit ? parseInt(limit) : 0;
    const courses = await Course.find(query).limit(finalLimit).lean();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// GET USER COURSES (My Courses)

exports.getMyCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).lean();
    const userSchedules = await Schedule.find({ userId }).populate('courseId');

    if (!userSchedules || userSchedules.length === 0) {
      return res.json([]);
    }

    const myMappedCourses = userSchedules
      .filter(item => item.courseId)
      .map(item => {
        const userCourseProgress = user?.myCourses?.find(c =>
          c.courseId.toString() === item.courseId._id.toString()
        );

        const lessons = item.courseId.lessons || [];
        const completedIds = userCourseProgress?.completedLessons || [];

        const stats = calculateStats(lessons, completedIds);

        return {
          ...item.courseId,
          _id: item.courseId._id,
          status: stats.status,
          progress: stats.progress,
          nextTopic: stats.nextTopic,
          scheduleId: item._id,
          completedLessons: completedIds,
          date: item.date,
          updatedAt: item.updatedAt
        };
      });

    res.json(myMappedCourses);
  } catch (error) {
    console.error("Error MyCourses:", error);
    res.status(500).json({ message: "Error fetching user courses" });
  }
};


// ENROLL COURSE

exports.enrollCourse = async (req, res) => {
  try {
    const { userId, courseId, date } = req.body;

    const existingEnroll = await Schedule.findOne({ userId, courseId });
    if (existingEnroll) {
      return res.status(400).json({ message: "Course already enrolled" });
    }

    const courseData = await Course.findById(courseId);
    if (!courseData) return res.status(404).json({ message: "Course not found" });

    // Schedule (untuk kalender & sidebar)
    const newEnroll = await Schedule.create({
      userId,
      courseId,
      topic: courseData.lessons[0]?.title || "Introduction",
      status: 'ongoing',
      progress: 0,
      date: date || new Date()
    });

    // Tambah ke array myCourses di model User
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        myCourses: {
          courseId: courseId,
          status: 'ongoing',
          completedLessons: []
        }
      }
    });

    res.status(201).json(newEnroll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// TOGGLE LESSON (Checklist Progress)

exports.toggleLessonStatusApi = async (req, res) => {
  try {
    const { userId, courseId, lessonId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.myCourses) user.myCourses = [];

    let courseIndex = user.myCourses.findIndex(c =>
      c.courseId && c.courseId.toString() === courseId.toString()
    );

    // Update list completed lessons di User
    if (courseIndex === -1) {
      user.myCourses.push({
        courseId: courseId,
        status: 'ongoing',
        completedLessons: [lessonId]
      });
      courseIndex = user.myCourses.length - 1;
    } else {
      const completed = user.myCourses[courseIndex].completedLessons.map(id => id.toString());
      const lessonStr = lessonId.toString();

      const idx = completed.indexOf(lessonStr);
      idx > -1 ? completed.splice(idx, 1) : completed.push(lessonStr);

      user.myCourses[courseIndex].completedLessons = completed;
    }

    user.markModified('myCourses');
    await user.save();

    // Sync ke Schedule
    const courseData = await Course.findById(courseId).lean();
    const stats = calculateStats(courseData.lessons, user.myCourses[courseIndex].completedLessons);

    await Schedule.findOneAndUpdate(
      { userId, courseId },
      { 
        progress: stats.progress,
        status: stats.status,
        topic: stats.nextTopic 
      }
    );

    // Return data lesson terbaru untuk UI
    const finalCompleted = user.myCourses[courseIndex].completedLessons.map(id => id.toString());
    const mappedLessons = courseData.lessons.map(lesson => ({
      ...lesson,
      isCompleted: finalCompleted.includes(lesson._id.toString())
    }));

    return res.status(200).json(mappedLessons);
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({ message: "Gagal update status", error: error.message });
  }
};

// CRUD DASAR COURSE & SCHEDULE

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).lean();
    if (!course) return res.status(404).json({ message: "Not found" });
    res.json(course);
  } catch (error) { res.status(500).json({ message: "Error" }); }
};

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updateProgress = async (req, res) => {
  try {
    const { userId, courseId, progress, status, topic } = req.body;
    const updated = await Schedule.findOneAndUpdate(
      { userId, courseId },
      { progress, status: status || 'ongoing', topic, updatedAt: new Date() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (error) { res.status(400).json({ message: error.message }); }
};