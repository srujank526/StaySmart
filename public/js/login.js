import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
      const data = {
          email,
          password
        };  
      const res = await axios.post('/api/v1/users/login', data);

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};

export const signup = async (name, email, password) => {
  try {
      const data = {
          name,
          email,
          password
        };  
      const res = await axios.post('/api/v1/users/signup', data);

    if (res.data.status === 'success') {
      showAlert('success', 'signed up successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};