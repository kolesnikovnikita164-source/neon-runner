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
