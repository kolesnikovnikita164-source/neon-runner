let coins = 0;
let level = 1;
let power = 1;

let hp = 100;
const maxHp = 100;

let powerCost = 25;
let autoCost = 100;
let autoClickers = 0;

const monsters = [
  {
    name: "Pikachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  },
  {
    name: "Glumanda",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
  },
  {
    name: "Schiggy",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
  },
  {
    name: "Bisasam",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  }
];

let monsterIndex = 0;

const coinsElement = document.getElementById("coins");
const levelElement = document.getElementById("level");
const powerElement = document.getElementById("power");

const hpBar = document.getElementById("hpBar");
const hpText = document.getElementById("hpText");

const monsterName = document.getElementById("monsterName");
const monsterImage = document.getElementById("monsterImage");

const message = document.getElementById("message");

const powerCostElement = document.getElementById("powerCost");
const autoCostElement = document.getElementById("autoCost");

function updateGame() {
  coinsElement.textContent = coins;
  levelElement.textContent = level;
  powerElement.textContent = power;

  hpText.textContent = hp + " / " + maxHp;

  hpBar.style.width = (hp / maxHp * 100) + "%";

  powerCostElement.textContent = powerCost;
  autoCostElement.textContent = autoCost;

  monsterName.textContent = monsters[monsterIndex].name;
  monsterImage.src = monsters[monsterIndex].image;
}

function attack() {
  hp -= power;

  if (hp < 0) {
    hp = 0;
  }

  coins += power;

  if (hp === 0) {
    defeatMonster();
  }

  updateGame();
}

function defeatMonster() {
  const reward = 50 + level * 10;

  coins += reward;
  level++;

  message.textContent =
    "🎉 Monster besiegt! +" + reward + " Münzen";

  monsterIndex++;

  if (monsterIndex >= monsters.length) {
    monsterIndex = 0;
  }

  hp = maxHp;
}

function buyPower() {
  if (coins < powerCost) {
    message.textContent = "❌ Nicht genug Münzen!";
    return;
  }

  coins -= powerCost;
  power++;

  powerCost = Math.floor(powerCost * 1.5);

  message.textContent = "💥 Deine Power wurde verbessert!";

  updateGame();
}

function buyAutoClick() {
  if (coins < autoCost) {
    message.textContent = "❌ Nicht genug Münzen!";
    return;
  }

  coins -= autoCost;
  autoClickers++;

  autoCost = Math.floor(autoCost * 1.7);

  message.textContent =
    "🤖 Auto-Klicker gekauft!";

  updateGame();
}

document
  .getElementById("attackButton")
  .addEventListener("click", attack);

document
  .getElementById("powerButton")
  .addEventListener("click", buyPower);

document
  .getElementById("autoButton")
  .addEventListener("click", buyAutoClick);

setInterval(function() {
  if (autoClickers > 0) {
    coins += autoClickers;
    updateGame();
  }
}, 1000);

updateGame();
