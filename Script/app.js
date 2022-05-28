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




const fetchData = async () => {
    try {
        const res = await fetch('https://matrix.sbapis.com/b/youtube/statistics?clientid=cli_6552711e08511188c436a630&token=0c33b7683cb9349dd41d938339a14c472e6ae0e1737ac21b02e2490b00dec290bc6303a5d7f935ec91e5d8251d3fda816339d0809d00fefa664d26404e3ea4fd&history=default&query=SocialBlade');
        const data = await res.json();
        console.log(data, "data")
    } catch (error) {
        console.log(error);
    };  
};

fetchData()

