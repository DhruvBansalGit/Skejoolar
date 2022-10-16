burger = document.querySelector('.burger');
navbar = document.querySelector('.navbar');
rightnav = document.querySelector('.rightnav');
navlist = document.querySelector('.nav-list');

burger.addEventListener('click',()=>{
    rightnav.classList.toggle('v-nav-resp');
    navlist.classList.toggle('v-nav-resp');
    navbar.classList.toggle('h-nav-resp');
})
let btnclear = document.querySelector('.reset')
let inputs = document.querySelectorAll('input')
let textareas = document.querySelectorAll('textarea')
btnclear.addEventListener('click',()=>{
inputs.forEach(input => input.value = "");
textareas.forEach(textarea => textarea.value = "");

})