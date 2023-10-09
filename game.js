const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const fullscreenButton = document.getElementById("fullscreen-button");
const scoreDisplay = document.getElementById("score");
const shootSound = document.getElementById("shoot-sound")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5,
};

const bullets = [];
const targets = [];
let score = 0;

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });
}

function drawTargets() {
    ctx.fillStyle = "green";
    targets.forEach((target) => {
        ctx.fillRect(target.x, target.y, 30, 30);
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBullets();
    drawTargets();

    if (targets.length === 0 || Math.random() < 0.02) {
        const target = {
            x: Math.random() * (canvas.width - 30),
            y: 0,
            speed: 2,
        };
        targets.push(target);
    }

    targets.forEach((target) => {
        target.y += target.speed;

        if (target.y > canvas.height) {
            targets.shift();
        }

        bullets.forEach((bullet) => {
            if (
                bullet.x < target.x + 30 &&
                bullet.x + 5 > target.x &&
                bullet.y < target.y + 30 &&
                bullet.y + 10 > target.y
            ) {
                bullets.splice(bullets.indexOf(bullet), 1);
                targets.splice(targets.indexOf(target), 1);
                score++;
                scoreDisplay.textContent = "Score: " + score; 
            }
        });
    });

    bullets.forEach((bullet) => {
        bullet.y -= 10;
        if (bullet.y < 0) {
            bullets.splice(bullets.indexOf(bullet), 1);
        }
    });

    requestAnimationFrame(update);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    } else if (event.key === " ") {
        const bullet = { x: player.x + player.width / 2 - 2.5, y: player.y };
        bullets.push(bullet);
    }
});

fullscreenButton.addEventListener("click", () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    } else if (event.key === " ") {
        const bullet = { x: player.x + player.width / 2 - 2.5, y: player.y };
        bullets.push(bullet);
        
        
        shootSound.currentTime = 0; 
        shootSound.play();
    }
});





update();
