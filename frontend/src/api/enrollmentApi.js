import axios from 'axios';

const API_URL = 'http://localhost:5000/api/enrollments';

export const getEnrollmentsByUserId = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

export const createEnrollment = (enrollmentData) => {
  return axios.post(API_URL, enrollmentData);
};

export const updateEnrollment = (enrollmentId, enrollmentData) => {
  return axios.put(API_URL, { enrollment_id: enrollmentId, ...enrollmentData });
};

export const deleteEnrollment = (enrollmentId) => {
  return axios.delete(`${API_URL}/${enrollmentId}`);
};

export const getEnrollments = (userId) => {
  return axios.get(`${API_URL}/users/${userId}/enrollments`);
};

export const enrollInCourse = (userId, courseId) => {
  return axios.post(`${API_URL}`, { userId, courseId });
};
