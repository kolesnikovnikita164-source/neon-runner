let coins = 0;
let clicks = 0;
let level = 1;
let power = 1;

const pokemon = [
  "⚡ Pikachu",
  "🔥 Glumanda",
  "💧 Schiggy",
  "🌿 Bisasam",
  "🐭 Evoli"
];

let currentPokemon = pokemon[0];

function clickPokemon() {
  coins += power;
  clicks++;

  if (clicks % 20 === 0) {
    level++;
    power++;
    alert("⭐ Level Up! Level " + level);
  }

  updateGame();
}

function changePokemon() {
  const random =
    Math.floor(Math.random() * pokemon.length);

  currentPokemon = pokemon[random];

  updateGame();
}

function updateGame() {
  document.getElementById("pokemon").textContent =
    currentPokemon;

  document.getElementById("coins").textContent =
    "🪙 Münzen: " + coins;

  document.getElementById("level").textContent =
    "⭐ Level: " + level;

  document.getElementById("power").textContent =
    "💥 Klick-Power: " + power;
}

updateGame();
