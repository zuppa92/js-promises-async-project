console.log('JavaScript file is running');

let deckId = null;

// Function to create a new shuffled deck
async function createNewDeck() {
  try {
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();

    // Debugging: Log the API response
    console.log('Create New Deck API Response:', data);

    // Check if the data contains the expected properties
    if (!data.deck_id) {
      throw new Error('Invalid API response format: deck_id is missing');
    }

    deckId = data.deck_id;
    document.getElementById('drawCardButton').disabled = false;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Function to draw a card from the deck
async function drawCard() {
  try {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();

    // Debugging: Log the API response
    console.log('Draw Card API Response:', data);

    // Check if the data contains the expected properties
    if (!data.cards || data.cards.length === 0) {
      throw new Error('Invalid API response format: cards are missing or empty');
    }

    let card = data.cards[0];

    // Log the value and suit of the card
    console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);

    // Display the card on the page
    const cardsDiv = document.getElementById('cards');
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardElement.appendChild(cardImage);
    cardsDiv.appendChild(cardElement);

    if (data.remaining === 0) {
      document.getElementById('drawCardButton').disabled = true;
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Event listener for the draw card button
document.getElementById('drawCardButton').addEventListener('click', drawCard);

// Initialize the page by creating a new deck
createNewDeck();
