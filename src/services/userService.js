import axios from 'axios';

const userLogin = (email, password) => {
  return axios.post('http://127.0.0.1:3000/api/user/login', {
    user: {
      email,
      password,
    },
  });
};

export { userLogin };
