let coins = 0;
let clicks = 0;
let level = 1;

let power = 1;
let autoClick = 0;

let powerCost = 25;
let autoCost = 100;

const pokemon = [
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
  },
  {
    name: "Evoli",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
  }
];

let currentPokemon = pokemon[0];

function clickPokemon() {
  coins += power;
  clicks++;

  checkLevel();
  updateGame();
}

function checkLevel() {
  level = Math.floor(clicks / 20) + 1;
}

function buyPower() {
  if (coins < powerCost) {
    alert("❌ Nicht genug Münzen!");
    return;
  }

  coins -= powerCost;
  power++;

  powerCost = Math.floor(powerCost * 1.6);

  updateGame();
}

function buyAutoClick() {
  if (coins < autoCost) {
    alert("❌ Nicht genug Münzen!");
    return;
  }

  coins -= autoCost;
  autoClick++;

  autoCost = Math.floor(autoCost * 1.8);

  updateGame();
}

function changePokemon() {
  const random = Math.floor(Math.random() * pokemon.length);

  currentPokemon = pokemon[random];

  updateGame();
}

function updateGame() {
  document.getElementById("pokemonName").textContent =
    currentPokemon.name;

  document.getElementById("pokemonImage").src =
    currentPokemon.image;

  document.getElementById("pokemonImage").alt =
    currentPokemon.name;

  document.getElementById("coins").textContent =
    "🪙 " + coins;

  document.getElementById("level").textContent =
    "⭐ Level " + level;

  document.getElementById("power").textContent =
    "💥 Power " + power;

  document.getElementById("powerCost").textContent =
    "Kosten: " + powerCost + " 🪙";

  document.getElementById("autoCost").textContent =
    "Kosten: " + autoCost + " 🪙";
}

// Auto-Klicker
setInterval(function() {
  if (autoClick > 0) {
    coins += autoClick;
    updateGame();
  }
}, 1000);

updateGame();
