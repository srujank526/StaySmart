import { showAlert } from "./alert";
import axios from 'axios';


export const postHouse = async (title, address, rentAmount, description, isAvailable) => {
    try {
        const data = {
            title, 
            address, 
            rentAmount, 
            description, 
            isAvailable
          };
          const res = await axios.post('/api/v1/house/', data);
  
      if (res.data.status === 'success') {
        showAlert('success', 'House added succesfully');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
}