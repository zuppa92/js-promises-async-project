console.log('JavaScript file is running');

async function fetchAllPokemon() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000'; // Adjust the limit as needed
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    return data.results;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

function getRandomPokemon(pokemonList, count = 3) {
  const shuffled = pokemonList.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function fetchPokemonData(pokemon) {
  try {
    let response = await fetch(pokemon.url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function fetchPokemonSpecies(pokemon) {
  try {
    let response = await fetch(pokemon.species.url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function generatePokemonData() {
  const allPokemon = await fetchAllPokemon();
  const randomPokemon = getRandomPokemon(allPokemon);

  for (const pokemon of randomPokemon) {
    const pokemonData = await fetchPokemonData(pokemon);
    const speciesData = await fetchPokemonSpecies(pokemonData);
    const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
    if (flavorTextEntry) {
      console.log(`${pokemonData.name}: ${flavorTextEntry.flavor_text}`);
    }
  }
}

document.getElementById('generatePokemonButton').addEventListener('click', async () => {
  const allPokemon = await fetchAllPokemon();
  const randomPokemon = getRandomPokemon(allPokemon);

  document.getElementById('pokemon-info').innerHTML = '';
  for (const pokemon of randomPokemon) {
    const pokemonData = await fetchPokemonData(pokemon);
    const speciesData = await fetchPokemonSpecies(pokemonData);
    const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
    if (flavorTextEntry) {
      displayPokemonData(pokemonData, flavorTextEntry.flavor_text);
    }
  }
});

function displayPokemonData(pokemon, description) {
  const pokemonInfoDiv = document.getElementById('pokemon-info');
  const card = document.createElement('div');
  card.classList.add('pokemon-card');

  const nameElement = document.createElement('h3');
  nameElement.textContent = pokemon.name;
  card.appendChild(nameElement);

  const imgElement = document.createElement('img');
  imgElement.src = pokemon.sprites.front_default;
  card.appendChild(imgElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;
  card.appendChild(descriptionElement);

  pokemonInfoDiv.appendChild(card);
}
