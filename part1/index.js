console.log('JavaScript file is running');

// Function to get a fact about a single number
async function getNumberFact(number) {
  const url = `http://numbersapi.com/${number}?json`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    console.log(`Fact about the number ${number}: ${data.text}`);
    displayFact(data.text, 'single-fact');
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Function to get facts about multiple numbers
async function getMultipleNumberFacts(numbers) {
  const url = `http://numbersapi.com/${numbers.join(',')}?json`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    for (const number in data) {
      console.log(`Fact about the number ${number}: ${data[number]}`);
      displayFact(data[number], 'multiple-facts');
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Function to get multiple facts about a favorite number
async function getFavoriteNumberFacts(number, count) {
  const factsPromises = [];
  for (let i = 0; i < count; i++) {
    factsPromises.push(getNumberFact(number));
  }
  try {
    await Promise.all(factsPromises);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Function to display a fact in the specified div
function displayFact(fact, elementId) {
  const factElement = document.createElement('p');
  factElement.textContent = fact;
  document.getElementById(elementId).appendChild(factElement);
}

// Example usage
getNumberFact(7); // Single number fact
getMultipleNumberFacts([7, 42, 100]); // Multiple number facts
getFavoriteNumberFacts(7, 4); // Four facts about a favorite number
