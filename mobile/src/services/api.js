import axios from 'axios';

// Ganti IP jika server pindah jaringan 
// const BASE_URL = 'http://10.26.98.57:5000/api'; 
const RENDER_URL = 'https://learnova-app-backend.onrender.com/api';

const apiClient = axios.create({
  baseURL: RENDER_URL, 
  timeout: 60000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- AUTH & USER ---

// Login User
export const loginApi = async (credentials) => {
  try {
    const response = await apiClient.post('/user/login', credentials);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Login failed";
    console.error("Login Error:", errorMsg);
    throw new Error(errorMsg);
  }
};

// Register User Baru
export const registerApi = async (userData) => {
  try {
    const response = await apiClient.post('/user/register', userData);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Registration failed";
    console.error("Register Error:", errorMsg);
    throw new Error(errorMsg);
  }
};

// Apakah email terdaftar (untuk Forgot Password)
export const checkEmailApi = async (email) => {
  try {
    const response = await apiClient.post('/user/check-email', { email });
    return response.data;
  } catch (error) {
    console.error("Error checking email:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Ambil data profile user
export const fetchUserProfile = async () => {
  try {
    const response = await apiClient.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data?.message || error.message);
    throw error;
  }
};

// --- COURSES ---

// Ambil daftar kursus dengan filter (Category, Limit, dll)
export const fetchCourses = async ({ category = '', limit = 5, userId = '', recommended = 'true' }) => {
  try {
    const response = await apiClient.get('/courses', {
      params: { 
        category: category || undefined, 
        limit, 
        userId: userId || undefined,
        recommended 
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching courses:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const fetchCourseDetail = async (id) => {
  try {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course detail:", error.response?.data?.message || error.message);
    throw error;
  }
};

// --- ENROLLMENT & PROGRESS ---

export const fetchMyCourses = async (userId) => {
  try {
    const response = await apiClient.get(`/courses/my-courses/${userId}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching my courses:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const enrollCourseApi = async (enrollData) => {
  try {
    const response = await apiClient.post('/courses/enroll', enrollData);
    return response; 
  } catch (error) {
    console.error("Enroll Course Error:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Update progress belajar (Lessons watched)
export const updateCourseProgressApi = async (progressData) => {
  try {
    const response = await apiClient.put('/courses/update-progress', progressData);
    return response.data;
  } catch (error) {
    console.error("Update Progress Error:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const toggleLessonStatusApi = async (data) => {
  try {
    const response = await apiClient.post('/courses/toggle-lesson', data);
    return response.data; 
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to toggle lesson";
    console.error("Toggle Lesson Error:", errorMsg);
    throw new Error(errorMsg);
  }
};

export default apiClient;