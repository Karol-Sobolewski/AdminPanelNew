const hamburger =document.querySelector('.hamburger');
const sidebar =document.querySelector('.page__nav');
console.log(sidebar, hamburger);

hamburger.addEventListener('click', function(){
    sidebar.classList.toggle('toggle');
})
