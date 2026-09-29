const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

let score = 0;
let coins = 0;
let xp = 0;
let level = 1;
let lives = 3;

let gameOver = false;
let victory = false;
let keys = {};
let attackCooldown = 0;

const player = {
  x: 70,
  y: 350,
  width: 35,
  height: 48,
  speed: 5,
  velocityY: 0,
  gravity: 0.65,
  jumpPower: -13,
  grounded: false,
  attacking: false
};

const platforms = [
  { x: 0, y: 450, width: 900, height: 50 },
  { x: 120, y: 360, width: 150, height: 20 },
  { x: 340, y: 290, width: 160, height: 20 },
  { x: 570, y: 350, width: 150, height: 20 },
  { x: 720, y: 240, width: 130, height: 20 }
];

const collectibles = [];

for (let i = 0; i < 12; i++) {
  collectibles.push({
    x: 80 + i * 65,
    y: 300 - (i % 3) * 55,
    radius: 9,
    collected: false
  });
}

const enemies = [
  {
    x: 260,
    y: 405,
    width: 35,
    height: 45,
    speed: 1.5,
    direction: 1,
    hp: 2
  },
  {
    x: 500,
    y: 245,
    width: 35,
    height: 45,
    speed: 1.8,
    direction: -1,
    hp: 2
  },
  {
    x: 700,
    y: 305,
    width: 35,
    height: 45,
    speed: 2,
    direction: 1,
    hp: 3
  }
];

const boss = {
  x: 760,
  y: 150,
  width: 90,
  height: 90,
  hp: 15,
  maxHp: 15,
  speed: 1
};

function collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function updatePlayer() {
  if (gameOver || victory) return;

  if (keys["ArrowLeft"] || keys["a"]) {
    player.x -= player.speed;
  }

  if (keys["ArrowRight"] || keys["d"]) {
    player.x += player.speed;
  }

  player.velocityY += player.gravity;
  player.y += player.velocityY;
  player.grounded = false;

  for (const platform of platforms) {
    if (
      player.velocityY >= 0 &&
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width &&
      player.y + player.height >= platform.y &&
      player.y + player.height <= platform.y + 25
    ) {
      player.y = platform.y - player.height;
      player.velocityY = 0;
      player.grounded = true;
    }
  }

  if (
    (keys[" "] || keys["ArrowUp"] || keys["w"]) &&
    player.grounded
  ) {
    player.velocityY = player.jumpPower;
  }

  player.x = Math.max(
    0,
    Math.min(W - player.width, player.x)
  );

  if (player.y > H + 50) {
    loseLife();
  }
}

function updateCoins() {
  for (const coin of collectibles) {
    if (coin.collected) continue;

    const dx =
      player.x + player.width / 2 - coin.x;

    const dy =
      player.y + player.height / 2 - coin.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 30) {
      coin.collected = true;
      coins++;
      score += 25;
      gainXP(10);
    }
  }
}

function gainXP(amount) {
  xp += amount;

  if (xp >= 100) {
    xp -= 100;
    level++;

    player.speed += 0.3;
    lives = Math.min(lives + 1, 5);

    showMessage("🔥 LEVEL UP! Level " + level);
  }
}

function updateEnemies() {
  for (const enemy of enemies) {
    if (enemy.x < -500) continue;

    enemy.x += enemy.speed * enemy.direction;

    if (
      enemy.x < 0 ||
      enemy.x + enemy.width > W
    ) {
      enemy.direction *= -1;
    }

    if (collision(player, enemy)) {
      if (player.attacking) {
        enemy.hp--;

        score += 50;
        gainXP(15);

        enemy.x += enemy.direction * -40;

        if (enemy.hp <= 0) {
          enemy.x = -1000;
        }
      } else {
        loseLife();
      }
    }
  }
}

function updateBoss() {
  if (boss.hp <= 0) {
    victory = true;
    score += 1000;

    showMessage(
      "🏆 BOSS BESIEGT! DU HAST GEWONNEN!"
    );

    return;
  }

  const distance = player.x - boss.x;

  if (Math.abs(distance) < 300) {
    if (distance > 0) {
      boss.x += boss.speed;
    } else {
      boss.x -= boss.speed;
    }
  }

  if (collision(player, boss)) {
    if (player.attacking) {
      boss.hp--;

      score += 100;
      gainXP(25);
    } else {
      loseLife();
    }
  }
}

function loseLife() {
  if (gameOver) return;

  lives--;

  player.x = 70;
  player.y = 350;
  player.velocityY = 0;

  if (lives <= 0) {
    gameOver = true;

    showMessage(
      "💀 GAME OVER – Neustart drücken!"
    );
  }
}

function attack() {
  if (gameOver || victory) return;
  if (attackCooldown > 0) return;

  player.attacking = true;
  attackCooldown = 20;

  setTimeout(() => {
    player.attacking = false;
  }, 180);
}

function update() {
  if (attackCooldown > 0) {
    attackCooldown--;
  }

  updatePlayer();
  updateCoins();
  updateEnemies();
  updateBoss();
  updateHUD();
}

function updateHUD() {
  document.getElementById("level").textContent =
    "🌍 Welt " + level;

  document.getElementById("score").textContent =
    "⭐ " + score;

  document.getElementById("coins").textContent =
    "🪙 " + coins;

  document.getElementById("hp").textContent =
    "❤️ " + lives;

  document.getElementById("xp").textContent =
    "XP " + xp + "/100";
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  const gradient = ctx.createLinearGradient(
    0,
    0,
    0,
    H
  );

  gradient.addColorStop(0, "#172554");
  gradient.addColorStop(1, "#050711");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  // Sterne
  ctx.fillStyle = "rgba(255,255,255,0.35)";

  for (let i = 0; i < 70; i++) {
    const x = (i * 137) % W;
    const y = (i * 73) % 350;

    ctx.fillRect(x, y, 2, 2);
  }

  // Plattformen
  for (const platform of platforms) {
    ctx.fillStyle = "#263653";

    ctx.fillRect(
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );

    ctx.fillStyle = "#54eaff";

    ctx.fillRect(
      platform.x,
      platform.y,
      platform.width,
      4
    );
  }

  // Coins
  for (const coin of collectibles) {
    if (coin.collected) continue;

    ctx.fillStyle = "#ffd84d";

    ctx.beginPath();

    ctx.arc(
      coin.x,
      coin.y,
      coin.radius,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  // Gegner
  for (const enemy of enemies) {
    if (enemy.x < -500) continue;

    ctx.fillStyle = "#ff4f72";

    ctx.fillRect(
      enemy.x,
      enemy.y,
      enemy.width,
      enemy.height
    );

    ctx.fillStyle = "white";

    ctx.fillRect(
      enemy.x + 7,
      enemy.y + 10,
      6,
      6
    );

    ctx.fillRect(
      enemy.x + 22,
      enemy.y + 10,
      6,
      6
    );
  }

  // Boss
  if (boss.hp > 0) {
    ctx.fillStyle = "#a855f7";

    ctx.fillRect(
      boss.x,
      boss.y,
      boss.width,
      boss.height
    );

    ctx.fillStyle = "#333";

    ctx.fillRect(
      boss.x,
      boss.y - 15,
      boss.width,
      8
    );

    ctx.fillStyle = "#ff456d";

    ctx.fillRect(
      boss.x,
      boss.y - 15,
      boss.width * (boss.hp / boss.maxHp),
      8
    );
  }

  // Spieler
  ctx.fillStyle = "#59f5a7";

  ctx.fillRect(
    player.x,
    player.y,
    player.width,
    player.height
  );

  // Augen
  ctx.fillStyle = "#101522";

  ctx.fillRect(
    player.x + 7,
    player.y + 10,
    6,
    6
  );

  ctx.fillRect(
    player.x + 22,
    player.y + 10,
    6,
    6
  );

  // Schwert
  if (player.attacking) {
    ctx.fillStyle = "white";

    ctx.fillRect(
      player.x + player.width,
      player.y + 15,
      45,
      8
    );
  }

  // Ende
  if (gameOver || victory) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";

    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = "center";

    ctx.fillStyle = "white";
    ctx.font = "bold 44px Arial";

    ctx.fillText(
      victory ? "🏆 GEWONNEN!" : "GAME OVER",
      W / 2,
      220
    );

    ctx.font = "22px Arial";

    ctx.fillText(
      "Score: " + score,
      W / 2,
      265
    );

    ctx.textAlign = "left";
  }
}

function gameLoop() {
  update();
  draw();

  requestAnimationFrame(gameLoop);
}

// Tastatur
window.addEventListener("keydown", function(e) {
  keys[e.key] = true;

  if (e.key === "Enter") {
    attack();
  }
});

window.addEventListener("keyup", function(e) {
  keys[e.key] = false;
});

// Mobile Buttons
function holdButton(id, key) {
  const button = document.getElementById(id);

  button.addEventListener("pointerdown", () => {
    keys[key] = true;
  });

  button.addEventListener("pointerup", () => {
    keys[key] = false;
  });

  button.addEventListener("pointerleave", () => {
    keys[key] = false;
  });
}

holdButton("left", "ArrowLeft");
holdButton("right", "ArrowRight");

document.getElementById("jump").addEventListener(
  "pointerdown",
  () => {
    if (player.grounded) {
      player.velocityY = player.jumpPower;
    }
  }
);

document.getElementById("attack").addEventListener(
  "click",
  attack
);

document.getElementById("restart").addEventListener(
  "click",
  () => {
    location.reload();
  }
);

updateHUD();
gameLoop();
