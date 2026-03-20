import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Authentication
export const register = async (userData) => {
  return await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
};

export const login = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
};

export const logout = async () => {
  return await axios.post(`${API_BASE_URL}/api/auth/logout`);
};

export const getCurrentUser = async (token) => {
  return await axios.get(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Courses
export const getCourses = async () => {
  return await axios.get(`${API_BASE_URL}/api/courses`);
};

export const getAllCourses = async (id) => {
  return await axios.get(`${API_BASE_URL}/api/courses/${id}`);
};

export const createCourse = async (courseData, token) => {
  return await axios.post(`${API_BASE_URL}/api/courses`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCourse = async (courseId, courseData, token) => {
  return await axios.put(`${API_BASE_URL}/api/courses/${courseId}`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCourse = async (courseId, token) => {
  return await axios.delete(`${API_BASE_URL}/api/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Instructor 
export const getAllInstructors = async () => {
  return await axios.get(`${API_BASE_URL}/api/instructors`);
};


export const getInstructor = async (id) => {
  return await axios.get(`${API_BASE_URL}/api/instructors/${id}`);
};

// Enrollments
export const enrollInCourse = async (courseId, token) => {
  return await axios.post(`${API_BASE_URL}/api/enrollments/${courseId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEnrollments = async (token) => {
  return await axios.get(`${API_BASE_URL}/api/enrollments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteEnrollments = async (token, courseId) => {
  return await axios.delete(`${API_BASE_URL}/api/enrollments/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// Videos
export const createVideo = async (courseId, videoData, token) => {
  return await axios.post(`${API_BASE_URL}/api/videos/${courseId}`, videoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateVideo = async (courseId, videoId, videoData, token) => {
  return await axios.put(`${API_BASE_URL}/api/videos/${courseId}/${videoId}`, videoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteVideo = async (courseId, videoId, token) => {
  return await axios.delete(`${API_BASE_URL}/api/videos/${courseId}/${videoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Users
export const getUser = async (userId, token) => {
  return await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (userId, userData, token) => {
  return await axios.put(`${API_BASE_URL}/api/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (userId, token) => {
  return await axios.delete(`${API_BASE_URL}/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
