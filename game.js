let coins = 0;
let level = 1;
let power = 1;

let hp = 100;
const maxHp = 100;

let monsterIndex = 0;
let caughtPokemon = [];

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

const monsterImage = document.getElementById("monsterImage");
const monsterName = document.getElementById("monsterName");
const hpText = document.getElementById("hpText");
const hpBar = document.getElementById("hpBar");
const coinsElement = document.getElementById("coins");
const levelElement = document.getElementById("level");
const powerElement = document.getElementById("power");
const message = document.getElementById("message");
const collection = document.getElementById("collection");

function updateGame() {
  coinsElement.textContent = coins;
  levelElement.textContent = level;
  powerElement.textContent = power;

  const monster = monsters[monsterIndex];

  monsterName.textContent = monster.name;
  monsterImage.src = monster.image;
  monsterImage.alt = monster.name;

  hpText.textContent = hp + " / " + maxHp;
  hpBar.style.width = (hp / maxHp * 100) + "%";

  showCollection();
}

function attack() {
  hp -= power;

  if (hp < 0) {
    hp = 0;
  }

  coins += power;

  if (hp === 0) {
    message.textContent = "🥎 Du kannst " + monsters[monsterIndex].name + " fangen!";
  }

  updateGame();
}

function catchPokemon() {
  if (hp > 0) {
    message.textContent = "❌ Das Pokémon hat noch zu viel HP!";
    return;
  }

  const monster = monsters[monsterIndex];

  const alreadyCaught = caughtPokemon.find(
    pokemon => pokemon.name === monster.name
  );

  if (!alreadyCaught) {
    caughtPokemon.push({
      name: monster.name,
      image: monster.image,
      level: 1,
      power: 1
    });

    coins += 100;

    message.textContent =
      "🎉 " + monster.name + " wurde gefangen! +100 Münzen";
  } else {
    message.textContent =
      "⭐ Du hast " + monster.name + " schon gefangen!";
  }

  monsterIndex++;

  if (monsterIndex >= monsters.length) {
    monsterIndex = 0;
  }

  hp = maxHp;

  updateGame();
}

function levelUp(index) {
  const pokemon = caughtPokemon[index];

  const cost = pokemon.level * 50;

  if (coins < cost) {
    message.textContent = "❌ Nicht genug Münzen!";
    return;
  }

  coins -= cost;

  pokemon.level++;
  pokemon.power++;

  message.textContent =
    "⬆️ " + pokemon.name + " ist jetzt Level " + pokemon.level + "!";

  updateGame();
}

function showCollection() {
  collection.innerHTML = "";

  caughtPokemon.forEach(function(pokemon, index) {
    const cost = pokemon.level * 50;

    const card = document.createElement("div");

    card.className = "pokemon-card";

    card.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.name}">
      <div>
        <b>${pokemon.name}</b>
        <p>⭐ Level ${pokemon.level}</p>
        <p>💥 Stärke ${pokemon.power}</p>
        <button onclick="levelUp(${index})">
          ⬆️ Leveln (${cost} 🪙)
        </button>
      </div>
    `;

    collection.appendChild(card);
  });
}

monsterImage.addEventListener("click", attack);

document
  .getElementById("catchButton")
  .addEventListener("click", catchPokemon);

updateGame();
let coins = 0;

// Dein Pokémon
let activePokemon = null;

// Gegner
let enemyIndex = 0;
let enemyLevel = 1;
let enemyHp = 100;
let enemyMaxHp = 100;

// Gefangene Pokémon
let caughtPokemon = [];

// Gegner-Pokémon
const enemies = [
  {
    name: "Pikachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    baseHp: 100
  },
  {
    name: "Glumanda",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    baseHp: 100
  },
  {
    name: "Schiggy",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    baseHp: 100
  },
  {
    name: "Bisasam",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    baseHp: 100
  }
];

// HTML-Elemente
const coinsElement = document.getElementById("coins");
const levelElement = document.getElementById("level");
const powerElement = document.getElementById("power");

const monsterName = document.getElementById("monsterName");
const monsterImage = document.getElementById("monsterImage");

const hpText = document.getElementById("hpText");
const hpBar = document.getElementById("hpBar");

const message = document.getElementById("message");
const collection = document.getElementById("collection");


// =========================
// SPIEL AKTUALISIEREN
// =========================

function updateGame() {

  coinsElement.textContent = coins;

  if (activePokemon !== null && caughtPokemon[activePokemon]) {

    const pokemon = caughtPokemon[activePokemon];

    levelElement.textContent = pokemon.level;
    powerElement.textContent = pokemon.power;

  } else {

    levelElement.textContent = 0;
    powerElement.textContent = 1;
  }

  const enemy = enemies[enemyIndex];

  monsterName.textContent =
    enemy.name + " – Level " + enemyLevel;

  monsterImage.src = enemy.image;
  monsterImage.alt = enemy.name;

  hpText.textContent =
    enemyHp + " / " + enemyMaxHp;

  hpBar.style.width =
    (enemyHp / enemyMaxHp * 100) + "%";

  showCollection();
}


// =========================
// GEGNER ANGREIFEN
// =========================

function attackEnemy() {

  let damage = 1;

  // Schaden vom aktiven Pokémon
  if (
    activePokemon !== null &&
    caughtPokemon[activePokemon]
  ) {

    damage = caughtPokemon[activePokemon].power;

  }

  enemyHp -= damage;

  if (enemyHp < 0) {
    enemyHp = 0;
  }

  coins += damage;

  if (enemyHp <= 0) {

    message.textContent =
      "🎉 " + enemies[enemyIndex].name +
      " ist besiegt! Du kannst es jetzt fangen.";

  } else {

    message.textContent =
      "💥 " + enemies[enemyIndex].name +
      " verliert " + damage + " HP!";
  }

  updateGame();
}


// =========================
// POKÉMON FANGEN
// =========================

function catchPokemon() {

  if (enemyHp > 0) {

    message.textContent =
      "❌ Der Gegner hat noch HP!";

    return;
  }

  const enemy = enemies[enemyIndex];

  const alreadyCaught = caughtPokemon.find(
    pokemon => pokemon.name === enemy.name
  );

  if (alreadyCaught) {

    message.textContent =
      "⭐ Du hast " + enemy.name +
      " bereits gefangen!";

  } else {

    caughtPokemon.push({

      name: enemy.name,

      image: enemy.image,

      level: enemyLevel,

      power: enemyLevel

    });

    coins += 100;

    // Erstes Pokémon automatisch auswählen
    if (activePokemon === null) {

      activePokemon =
        caughtPokemon.length - 1;
    }

    message.textContent =
      "🥎 " + enemy.name +
      " wurde gefangen! +100 🪙";
  }

  // Nächster Gegner
  nextEnemy();

  updateGame();
}


// =========================
// NÄCHSTER GEGNER
// =========================

function nextEnemy() {

  enemyIndex++;

  if (enemyIndex >= enemies.length) {

    enemyIndex = 0;
  }

  enemyLevel++;

  const enemy = enemies[enemyIndex];

  enemyMaxHp =
    enemy.baseHp + (enemyLevel - 1) * 25;

  enemyHp = enemyMaxHp;
}


// =========================
// POKÉMON AUSWÄHLEN
// =========================

function selectPokemon(index) {

  if (!caughtPokemon[index]) {
    return;
  }

  activePokemon = index;

  const pokemon = caughtPokemon[index];

  message.textContent =
    "⚡ " + pokemon.name +
    " ist jetzt aktiv!";

  updateGame();
}


// =========================
// POKÉMON LEVELN
// =========================

function levelUp(index) {

  const pokemon = caughtPokemon[index];

  if (!pokemon) {
    return;
  }

  const cost =
    pokemon.level * 50;

  if (coins < cost) {

    message.textContent =
      "❌ Du brauchst " +
      cost + " Münzen!";

    return;
  }

  coins -= cost;

  pokemon.level++;

  pokemon.power++;

  message.textContent =
    "⬆️ " + pokemon.name +
    " ist jetzt Level " +
    pokemon.level + "!";

  updateGame();
}


// =========================
// SAMMLUNG ANZEIGEN
// =========================

function showCollection() {

  if (!collection) {
    return;
  }

  collection.innerHTML = "";

  caughtPokemon.forEach(
    function(pokemon, index) {

      const cost =
        pokemon.level * 50;

      const card =
        document.createElement("div");

      card.className =
        "pokemon-card";

      const activeText =
        activePokemon === index
          ? "✅ AKTIV"
          : "⚡ AUSWÄHLEN";

      card.innerHTML = `

        <img
          src="${pokemon.image}"
          alt="${pokemon.name}"
        >

        <div>

          <b>${pokemon.name}</b>

          <p>
            ⭐ Level ${pokemon.level}
          </p>

          <p>
            💥 Stärke ${pokemon.power}
          </p>

          <button
            onclick="selectPokemon(${index})"
          >
            ${activeText}
          </button>

          <button
            onclick="levelUp(${index})"
          >
            ⬆️ Leveln
            (${cost} 🪙)
          </button>

        </div>
      `;

      collection.appendChild(card);
    }
  );
}


// =========================
// AUF GEGNER KLICKEN
// =========================

monsterImage.addEventListener(
  "click",
  attackEnemy
);


// =========================
// FANG-BUTTON
// =========================

const catchButton =
  document.getElementById("catchButton");

if (catchButton) {

  catchButton.addEventListener(
    "click",
    catchPokemon
  );
}


// =========================
// START
// =========================

updateGame();
let coins = 0;

let activePokemon = null;
let enemyIndex = 0;
let enemyLevel = 1;

let enemyHp = 100;
let enemyMaxHp = 100;

let caughtPokemon = [];

const enemies = [
  {
    name: "Pikachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    baseHp: 100
  },
  {
    name: "Glumanda",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    baseHp: 120
  },
  {
    name: "Schiggy",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    baseHp: 140
  },
  {
    name: "Bisasam",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    baseHp: 160
  }
];

const coinsElement = document.getElementById("coins");
const levelElement = document.getElementById("level");
const powerElement = document.getElementById("power");

const monsterName = document.getElementById("monsterName");
const monsterImage = document.getElementById("monsterImage");

const hpText = document.getElementById("hpText");
const hpBar = document.getElementById("hpBar");

const message = document.getElementById("message");
const collection = document.getElementById("collection");

const catchButton = document.getElementById("catchButton");

function updateGame() {

  coinsElement.textContent = coins;

  if (activePokemon !== null && caughtPokemon[activePokemon]) {

    levelElement.textContent =
      caughtPokemon[activePokemon].level;

    powerElement.textContent =
      caughtPokemon[activePokemon].power;

  } else {

    levelElement.textContent = 0;
    powerElement.textContent = 1;
  }

  const enemy = enemies[enemyIndex];

  monsterName.textContent =
    enemy.name + " – Level " + enemyLevel;

  monsterImage.src = enemy.image;
  monsterImage.alt = enemy.name;

  hpText.textContent =
    enemyHp + " / " + enemyMaxHp;

  hpBar.style.width =
    (enemyHp / enemyMaxHp * 100) + "%";

  if (enemyHp <= 0) {
    catchButton.style.display = "block";
  } else {
    catchButton.style.display = "none";
  }

  showCollection();
}


// Pokémon angreifen
function attackEnemy() {

  let damage = 1;

  if (
    activePokemon !== null &&
    caughtPokemon[activePokemon]
  ) {
    damage = caughtPokemon[activePokemon].power;
  }

  enemyHp -= damage;

  if (enemyHp < 0) {
    enemyHp = 0;
  }

  coins += damage;

  if (enemyHp <= 0) {

    message.textContent =
      "🎉 " + enemies[enemyIndex].name +
      " besiegt! Fang es!";

  } else {

    message.textContent =
      "💥 -" + damage + " HP";
  }

  updateGame();
}


// Pokémon fangen
function catchPokemon() {

  if (enemyHp > 0) {
    return;
  }

  const enemy = enemies[enemyIndex];

  const pokemon = {
    name: enemy.name,
    image: enemy.image,
    level: enemyLevel,
    power: enemyLevel
  };

  caughtPokemon.push(pokemon);

  coins += 100;

  if (activePokemon === null) {
    activePokemon = 0;
  }

  message.textContent =
    "🥎 " + enemy.name +
    " gefangen! +100 🪙";

  // NEUER GEGNER
  nextEnemy();

  updateGame();
}


// Neuer Gegner
function nextEnemy() {

  enemyIndex++;

  if (enemyIndex >= enemies.length) {
    enemyIndex = 0;
  }

  enemyLevel++;

  const enemy = enemies[enemyIndex];

  enemyMaxHp =
    enemy.baseHp +
    (enemyLevel - 1) * 30;

  enemyHp = enemyMaxHp;
}


// Pokémon auswählen
function selectPokemon(index) {

  if (!caughtPokemon[index]) {
    return;
  }

  activePokemon = index;

  const pokemon = caughtPokemon[index];

  message.textContent =
    "⚡ " + pokemon.name +
    " ist jetzt aktiv!";

  updateGame();
}


// Pokémon leveln
function levelUp(index) {

  const pokemon = caughtPokemon[index];

  if (!pokemon) {
    return;
  }

  const cost = pokemon.level * 50;

  if (coins < cost) {

    message.textContent =
      "❌ Du brauchst " +
      cost + " Münzen!";

    return;
  }

  coins -= cost;

  pokemon.level++;
  pokemon.power++;

  message.textContent =
    "⭐ " + pokemon.name +
    " ist jetzt Level " +
    pokemon.level + "!";

  updateGame();
}


// Sammlung
function showCollection() {

  if (!collection) {
    return;
  }

  collection.innerHTML = "";

  caughtPokemon.forEach(function(pokemon, index) {

    const cost = pokemon.level * 50;

    const card =
      document.createElement("div");

    card.className = "pokemon-card";

    const active =
      activePokemon === index;

    card.innerHTML = `

      <img
        src="${pokemon.image}"
        alt="${pokemon.name}"
      >

      <div class="pokemon-info">

        <h3>${pokemon.name}</h3>

        <p>⭐ Level ${pokemon.level}</p>

        <p>💥 Stärke ${pokemon.power}</p>

        <button onclick="selectPokemon(${index})">
          ${active ? "✅ AKTIV" : "⚡ AUSWÄHLEN"}
        </button>

        <button onclick="levelUp(${index})">
          ⬆️ Leveln (${cost} 🪙)
        </button>

      </div>
    `;

    collection.appendChild(card);
  });
}


// Direkt auf Pokémon klicken
monsterImage.addEventListener(
  "click",
  attackEnemy
);


// Fang-Button
if (catchButton) {

  catchButton.addEventListener(
    "click",
    catchPokemon
  );
}


// Start
updateGame();
