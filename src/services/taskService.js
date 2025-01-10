import axios from 'axios';

const token = localStorage.getItem('access_token');
console.log('Token:', token);
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const createTaskk = (data) => {
  return axios.post('http://127.0.0.1:3000/api/todos/todos', data, {
    headers,
  });
};

const getAllTask = () => {
  return axios
    .get('http://127.0.0.1:3000/api/todos/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Response:', response.data); // Log the response to see what is being returned
      return response.data;
    })
    .catch((error) => {
      console.error('Error:', error); // Log any errors
      throw error;
    });
};

const updateTask = (id, data) => {
  return axios.patch(`http://127.0.0.1:3000/api/todos/todos/${id}`, data, {
    headers,
  });
};

const deleteTask = (id) => {
  return axios.delete(`http://127.0.0.1:3000/api/todos/todos/${id}`, {
    headers,
  });
};

const getProgress = () => {
  return axios.get(`http://localhost:3000/api/todos/progress`, {
    headers,
  });
};

export { getAllTask, updateTask, deleteTask, createTaskk, getProgress };
