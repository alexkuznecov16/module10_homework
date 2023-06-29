const fillIcon = document.getElementById('fillSvg');
const notFillIcon = document.getElementById('notFillSvg');
const btn = document.getElementById('myButton');
let num = 0;

btn.addEventListener('click', () => {
    if (num === 0) {
        notFillIcon.setAttribute('style', 'display: none;');
        fillIcon.setAttribute('style', 'display: block;');
        num+=1;
    } else {
        fillIcon.setAttribute('style', 'display: none;');
        notFillIcon.setAttribute('style', 'display: block;');
        num-=1;
    }
    setTimeout(function(){
        console.log('Is clicked!')
    }, 1000)
});