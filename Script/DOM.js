const nav = document.querySelector('#hamburger');
const menu = document.querySelector('#menu');
const menuClose = document.getElementById('menu-info')
// Menu Hamburguesa

nav.addEventListener('click', e =>{
    nav.classList.toggle('open');
});
// Menu lateral
nav.addEventListener('click', (e) => {
    menu.classList.toggle('menu-active');
})
menuClose.addEventListener('click', (e)=>{
    menu.classList.remove('menu-active');
    nav.classList.remove('open');  
})





