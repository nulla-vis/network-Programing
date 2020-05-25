var timeLeft = document.querySelector('#time-left');
let currentTime = timeLeft.textContent;
setInterval(countDown, 1000);
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if(currentTime === 0){
        timeLeft.textContent = 60;
        currentTime = 60;
    }
}
