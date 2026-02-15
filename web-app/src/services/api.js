import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_API_URL || 'http://10.26.98.57:5000/api'; 
const BASE_URL = 'https://learnova-app-backend.onrender.com/api'; 

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const loginApi = async (credentials) => {
  try {
    const response = await apiClient.post('/user/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed.");
  }
};

export const registerApi = async (userData) => {
  try {
    const response = await apiClient.post('/user/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed.");
  }
};

export const fetchCourses = async ({ category = '', recommended = '', limit }) => {
  try {
    const response = await apiClient.get('/courses', {
      params: { 
        category: (category && category !== 'All') ? category : undefined, 
        recommended: recommended || undefined,
        limit: limit || undefined 
      }
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const fetchCourseDetail = async (id) => {
  try {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Course not found.");
  }
};

export const enrollCourseApi = async (enrollData) => {
  try {
    const response = await apiClient.post('/courses/enroll', enrollData);
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to enroll.");
  }
};

export const fetchMyCourses = async (userId) => {
  try {
    const response = await apiClient.get(`/courses/my-courses/${userId}`);
    return response.data; 
  } catch (error) {
    throw new Error("Failed to fetch your courses.");
  }
};

export const toggleLessonStatusApi = async (userId, courseId, lessonId) => {
    try {
        const response = await apiClient.post('/courses/toggle-lesson', {
            userId: userId,
            courseId: courseId,
            lessonId: lessonId
        });
        return response.data;
    } catch (error) {
        console.error("API Error Detail:", error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to update lesson status.");
    }
};

export default apiClient;