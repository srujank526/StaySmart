import { login, logout, signup } from './login';
import { postHouse } from './postHouse';


const logoUrl = document.querySelector('.logoUrl')
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.logoutBtn');
const signupForm = document.querySelector('.signupForm');
const postHouseForm = document.querySelector('.postHouseForm');

if(logoUrl){
    logoUrl.style.cursor = 'pointer';
    logoUrl.addEventListener('click',()=>{
        location.assign('/');

    })
}
if(loginForm){
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      login(email, password);
    });
}

if(logoutBtn)logoutBtn.addEventListener('click',logout)

if(signupForm){
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signup(name,email, password);
      });
}
if(postHouseForm){
    postHouseForm.addEventListener('submit',e=>{
        e.preventDefault();
        const title = document.getElementById('title').value;
        const rentAmount = document.getElementById('rentAmount').value;
        const description = document.getElementById('description').value;
        const isAvailable = document.getElementById('isAvailable').checked;
      
        // Collect address fields
        const address = {
          street: document.getElementById('street').value,
          houseNumber: document.getElementById('houseNumber').value,
          zip: document.getElementById('zip').value,
          city: document.getElementById('city').value,
          state: document.getElementById('state').value,
          country: document.getElementById('country').value,
        };
        postHouse(title, address, rentAmount, description, isAvailable )
    })
}