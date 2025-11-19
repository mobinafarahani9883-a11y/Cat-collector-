const cat = document.getElementById('cat');
const food = document.getElementById('food');
const trap = document.getElementById('trap');
const scoreDisplay = document.getElementById('score');
const healthDisplay = document.getElementById('health');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');

let score = 0;
let health = 3;
const gameWidth = 800;
const gameHeight = 500;
const moveStep = 20;

// حرکت گربه با دکمه لمسی
function moveLeft() {
    let left = parseInt(window.getComputedStyle(cat).left);
    cat.style.left = Math.max(0, left - moveStep) + 'px';
}

function moveRight() {
    let left = parseInt(window.getComputedStyle(cat).left);
    cat.style.left = Math.min(gameWidth - 80, left + moveStep) + 'px';
}

leftBtn.addEventListener('touchstart', moveLeft);
rightBtn.addEventListener('touchstart', moveRight);

// حرکت تصادفی غذا و تله
function moveItems() {
    food.style.left = Math.random() * (gameWidth - 50) + 'px';
    food.style.top = Math.random() * (gameHeight - 50) + 'px';

    trap.style.left = Math.random() * (gameWidth - 50) + 'px';
    trap.style.top = Math.random() * (gameHeight - 50) + 'px';
}

// بررسی برخورد
function checkCollision() {
    const cRect = cat.getBoundingClientRect();
    const fRect = food.getBoundingClientRect();
    const tRect = trap.getBoundingClientRect();

    function intersect(r1, r2){
        return !(r2.left > r1.right || 
                 r2.right < r1.left || 
                 r2.top > r1.bottom ||
                 r2.bottom < r1.top);
    }

    if(intersect(cRect, fRect)){
        score += 10;
        moveItems();
    }

    if(intersect(cRect, tRect)){
        health -= 1;
        moveItems();
    }

    scoreDisplay.textContent = 'امتیاز: ' + score;
    healthDisplay.textContent = 'جون: ' + health;

    if(health <= 0){
        alert('Game Over! Your score: ' + score);
        score = 0;
        health = 3;
        moveItems();
    }
}

setInterval(checkCollision, 100);
moveItems();
