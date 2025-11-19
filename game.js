const hero = document.getElementById("hero");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const gameOverDisplay = document.getElementById("game-over");

let score = 0;
let lives = 3;
let heroSpeed = 15;
let items = []; // آرایه آیتم‌ها
let gameInterval;
let spawnInterval;
let gameOver = false;

// حرکت گربه چپ و راست
document.addEventListener("keydown", function(e) {
    let left = parseInt(window.getComputedStyle(hero).left);
    if(e.key === "ArrowLeft" && left > 0) {
        hero.style.left = (left - heroSpeed) + "px";
    }
    if(e.key === "ArrowRight" && left < (window.innerWidth - hero.offsetWidth)) {
        hero.style.left = (left + heroSpeed) + "px";
    }
});

// ساخت آیتم‌ها
function createItem() {
    if(gameOver) return;
    const item = document.createElement("div");
    item.classList.add("item");
    
    // نوع آیتم: food یا trap
    const type = Math.random() < 0.6 ? "food" : "trap"; 
    item.dataset.type = type;

    item.style.top = "-100px"; // بالای صفحه
    item.style.left = "50%";
    item.style.transform = "translateX(-50%)";
    
    game.appendChild(item);
    items.push(item);
}

// حرکت آیتم‌ها
function moveItems() {
    items.forEach((item, index) => {
        let top = parseInt(window.getComputedStyle(item).top);
        top += 5; // سرعت حرکت
        item.style.top = top + "px";

        // برخورد با گربه
        const heroRect = hero.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
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

        // اگر از پایین صفحه خارج شد حذف شود
        if(top > window.innerHeight){
            item.remove();
            items.splice(index,1);
        }
    });

    // بررسی Game Over
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

    // پاک کردن آیتم‌های قبلی
    items.forEach(item => item.remove());
    items = [];

    // حرکت آیتم‌ها هر 50ms
    gameInterval = setInterval(moveItems, 50);

    // ایجاد آیتم جدید هر 1.2 ثانیه
    spawnInterval = setInterval(createItem, 1200);
}

// شروع خودکار بازی
startGame();
