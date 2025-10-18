import axios from 'axios';

const API_URL = '/api';

// Auth APIs
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/auth/profile`);
  return response.data;
};

// Topic APIs
export const getTopics = async () => {
  const response = await axios.get(`${API_URL}/topics`);
  return response.data;
};

export const getTopicById = async (id) => {
  const response = await axios.get(`${API_URL}/topics/${id}`);
  return response.data;
};

export const createTopic = async (topicData) => {
  const response = await axios.post(`${API_URL}/topics`, topicData);
  return response.data;
};

// Problem APIs
export const getProblems = async (topicId) => {
  const url = topicId ? `${API_URL}/problems?topic=${topicId}` : `${API_URL}/problems`;
  const response = await axios.get(url);
  return response.data;
};

export const getProblemsByTopic = async (topicId) => {
  const response = await axios.get(`${API_URL}/problems/topic/${topicId}`);
  return response.data;
};

export const getProblemById = async (id) => {
  const response = await axios.get(`${API_URL}/problems/${id}`);
  return response.data;
};

export const createProblem = async (problemData) => {
  const response = await axios.post(`${API_URL}/problems`, problemData);
  return response.data;
};

// Progress APIs
export const getUserProgress = async () => {
  const response = await axios.get(`${API_URL}/progress`);
  return response.data;
};

export const getProblemProgress = async (problemId) => {
  const response = await axios.get(`${API_URL}/progress/problem/${problemId}`);
  return response.data;
};

export const updateProgress = async (progressData) => {
  const response = await axios.post(`${API_URL}/progress`, progressData);
  return response.data;
};

export const getProgressStats = async () => {
  const response = await axios.get(`${API_URL}/progress/stats`);
  return response.data;
};
