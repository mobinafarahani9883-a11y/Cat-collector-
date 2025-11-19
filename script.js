const hero = document.getElementById("hero");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const gameOverDisplay = document.getElementById("game-over");

let score = 0;
let lives = 3;
let heroSpeed = 15;
let items = [];
let gameInterval;
let spawnInterval;
let gameOver = false;

// کنترل گربه با لمس (Touch)
let touchStartX = 0;

game.addEventListener("touchstart", function(e){
    touchStartX = e.touches[0].clientX;
});

game.addEventListener("touchmove", function(e){
    let touchX = e.touches[0].clientX;
    let delta = touchX - touchStartX;

    let left = parseInt(window.getComputedStyle(hero).left);
    left += delta;

    // محدود کردن حرکت گربه داخل صفحه
    if(left < 0) left = 0;
    if(left > window.innerWidth - hero.offsetWidth) left = window.innerWidth - hero.offsetWidth;

    hero.style.left = left + "px";

    touchStartX = touchX;
    e.preventDefault();
});

// ساخت آیتم‌ها
function createItem() {
    if(gameOver) return;
    const item = document.createElement("div");
    item.classList.add("item");
    
    const type = Math.random() < 0.6 ? "food" : "trap"; 
    item.dataset.type = type;

    item.style.top = "150px"; 
    item.style.left = Math.random() * (window.innerWidth - 140) + "px"; 
    
    game.appendChild(item);
    items.push(item);
}

// حرکت آیتم‌ها
function moveItems() {
    items.forEach((item, index) => {
        let top = parseInt(window.getComputedStyle(item).top);
        top += 8; 
        item.style.top = top + "px";

        const heroRect = hero.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        // برخورد آیتم با گربه
        if(
            heroRect.left < itemRect.right &&
            heroRect.right > itemRect.left &&
            heroRect.top < itemRect.bottom &&
            heroRect.bottom > itemRect.top
        ){
            if(item.dataset.type === "food") score += 10;
            else if(item.dataset.type === "trap") lives -= 1;

            scoreDisplay.textContent = "Score: " + score;
            livesDisplay.textContent = "Lives: " + lives;

            item.remove();
            items.splice(index,1);
        }

        if(top > window.innerHeight){
            item.remove();
            items.splice(index,1);
        }
    });

    if(lives <= 0){
        gameOver = true;
        gameOverDisplay.style.display = "block";
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
    }
}

// شروع بازی
function startGame() {
    gameOver = false;
    score = 0;
    lives = 3;
    scoreDisplay.textContent = "Score: " + score;
    livesDisplay.textContent = "Lives: " + lives;
    gameOverDisplay.style.display = "none";

    items.forEach(item => item.remove());
    items = [];

    gameInterval = setInterval(moveItems, 50);
    spawnInterval = setInterval(createItem, 1200);
}

startGame();
