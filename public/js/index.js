import { login, logout } from './login';


const logoUrl = document.querySelector('.logoUrl')
const loginForm = document.querySelector('.form--login');

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