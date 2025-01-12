import axios from 'axios';

const token = localStorage.getItem('access_token');
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const userLogin = (email, password) => {
  return axios.post('http://127.0.0.1:3000/api/user/login', {
    user: {
      email,
      password,
    },
  });
};

const userLogout = () => {
  return axios.delete('http://127.0.0.1:3000/api/user/logout', {
    headers,
  });
};

const userSignup = (email, password, password_confirmation) => {
  return axios.post('http://127.0.0.1:3000/api/user/signup', {
    user: {
      email,
      password,
      password_confirmation,
    },
  });
};

export { userLogin, userLogout, userSignup };
