const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let score = 0;
let lives = 3;

document.getElementById("score").textContent = score;
document.getElementById("lives").textContent = lives;

const images = {
    player: new Image(),
    cat: new Image(),
    dog: new Image(),
    bg: new Image()
};

images.player.src = "assets/player-cat.png";
images.cat.src = "assets/cat-collect.png";
images.dog.src = "assets/dog-obstacle.png";
images.bg.src = "assets/background.png";

const player = {
    x: 50,
    y: 350,
    width: 60,
    height: 60,
    speed: 5
};

let items = [];
let obstacles = [];
let gameOver = false;

canvas.addEventListener("touchstart", (e) => jump());

let velocityY = 0;
const gravity = 0.6;

function jump() {
    if (player.y >= 350) {
        velocityY = -12;
    }
}

function spawnCat() {
    items.push({
        x: 720,
        y: 350,
        width: 50,
        height: 50
    });
}

function spawnDog() {
    obstacles.push({
        x: 720,
        y: 360,
        width: 60,
        height: 60
    });
}

setInterval(spawnCat, 2000);
setInterval(spawnDog, 3000);

function update() {
    if (gameOver) return;

    velocityY += gravity;
    player.y += velocityY;

    if (player.y > 350) {
        player.y = 350;
    }

    items.forEach((item, index) => {
        item.x -= 4;

        if (
            player.x < item.x + item.width &&
            player.x + player.width > item.x &&
            player.y < item.y + item.height &&
            player.y + player.height > item.y
        ) {
            score++;
            document.getElementById("score").textContent = score;
            items.splice(index, 1);
        }

        if (item.x < -50) items.splice(index, 1);
    });

    obstacles.forEach((dog, index) => {
        dog.x -= 5;

        if (
            player.x < dog.x + dog.width &&
            player.x + player.width > dog.x &&
            player.y < dog.y + dog.height &&
            player.y + player.height > dog.y
        ) {
            lives--;
            document.getElementById("lives").textContent = lives;
            obstacles.splice(index, 1);

            if (lives <= 0) {
                gameOver = true;
                alert("بازی تمام شد!");
            }
        }

        if (dog.x < -60) obstacles.splice(index, 1);
    });

    draw();
}

function draw() {
    ctx.drawImage(images.bg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.player, player.x, player.y, player.width, player.height);

    items.forEach((item) => {
        ctx.drawImage(images.cat, item.x, item.y, item.width, item.height);
    });

    obstacles.forEach((dog) => {
        ctx.drawImage(images.dog, dog.x, dog.y, dog.width, dog.height);
    });
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
