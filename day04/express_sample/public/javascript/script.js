var timeLeft = document.querySelector('#time-left');
let currentTime = timeLeft.textContent;
setInterval(countDown, 200);
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if(currentTime === 40){
        timeLeft.classList.remove('from60')
        timeLeft.classList.add('last40')
    }else if(currentTime === 20){
        timeLeft.classList.remove('last40')
        timeLeft.classList.add('last20')
    }else if(currentTime === 10){
        timeLeft.classList.remove('last20')
        timeLeft.classList.add('last10')
    }else if(currentTime === 0){
        timeLeft.classList.remove('last10')
        timeLeft.textContent = 60;
        currentTime = 60;
    }
}