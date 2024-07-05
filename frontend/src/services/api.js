import axios from 'axios';

// Set up a base URL for your API requests
const API_URL = 'http://localhost:5000/api';

// Function to get all courses
export const getCourses = () => {
  return axios.get(`${API_URL}/courses`);
};

// Function to get a single course by ID
export const getCourse = (courseId) => {
  return axios.get(`${API_URL}/courses/${courseId}`);
};

// Function to create a new course
export const createCourse = (courseData) => {
  return axios.post(`${API_URL}/courses`, courseData);
};

// Function to update a course by ID
export const updateCourse = (courseId, courseData) => {
  return axios.put(`${API_URL}/courses/${courseId}`, courseData);
};

// Function to delete a course by ID
export const deleteCourse = (courseId) => {
  return axios.delete(`${API_URL}/courses/${courseId}`);
};

// Function to get enrollments for a user
export const getEnrollments = (userId) => {
  return axios.get(`${API_URL}/users/${userId}/enrollments`);
};

// Function to enroll in a course
export const enrollInCourse = (userId, courseId) => {
  return axios.post(`${API_URL}/enrollments`, { userId, courseId });
};

// Function to login
export const login = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

// Function to get the current user
export const getCurrentUser = () => {
  return axios.get(`${API_URL}/auth/user`);
};

// Set up axios to include the token in requests if it exists
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

