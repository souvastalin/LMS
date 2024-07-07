import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getCourses = () => {
  return axios.get(`${API_URL}/courses`);
};

export const getCourse = (courseId) => {
    return axios.get(`${API_URL}/courses/${courseId}`);
};

export const createCourse = (courseData) => {
  return axios.post(`${API_URL}/courses`, courseData);
};

export const updateCourse = (courseId, courseData) => {
  return axios.put(`${API_URL}/courses/${courseId}`, courseData);
};

export const deleteCourse = (courseId) => {  return axios.delete(`${API_URL}/courses/${courseId}`);
};

export const getCoursesByTeacherId = (teacherId) => {
  return axios.get(`${API_URL}/courses/teacher/${teacherId}`);
};
};
