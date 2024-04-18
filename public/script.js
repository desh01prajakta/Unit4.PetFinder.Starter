const API_URL = `http://localhost:8080/api/v1`;

const state = {
  pets: [],
};

/**
 * Fetches all pets from the API.
 * @returns {Object[]} the array of pet objects
 */
const fetchAllPets = async () => {
  try {
    const response = await fetch(`${API_URL}/pets`);
    const json = await response.json();
    renderAllPets(json);
  } catch (err) {
    console.error("Uh oh, trouble fetching pets!", err);
  }
};

//DOM elements
const $main = document.querySelector("main");

const createCard = ({ age, breed, name, owner, telephone }) => {
  //create elements
  const card = document.createElement("section");
  const div = document.createElement("div");
  const nameHeader = document.createElement("h2");
  const ownerName = document.createElement("p");
  const ownerPhone = document.createElement("p");
  const breedInfo = document.createElement("p");
  const ageInfo = document.createElement("p");

  //add classnames to the elements
  card.className = "card";

  //add pet information to the elements
  nameHeader.textContent = name;
  ownerName.textContent = owner;
  ownerPhone.textContent = telephone;
  breedInfo.textContent = `Breed: ${breed}`;
  ageInfo.textContent = `Age: ${age}`;

  const elements = [nameHeader, ownerName, ownerPhone, breedInfo, ageInfo];

  //add the elements to the DOM
  elements.forEach((element) => {
    div.appendChild(element);
  });

  card.appendChild(div);

  //return the new DOM card
  return card;
};

/**
 * Updates `<main>` to display a list of all pets.
 */
const renderAllPets = (petList) => {
  //clears the page of any previous elements
  $main.replaceChildren();

  //check if the list has pets
  if (petList.length < 1) {
    const message = document.createElement("h2");
    message.textContent = "No current pets";
    $main.appendChild(message);
    return;
  }

  //render each pet
  petList.forEach((pet) => {
    const card = createCard(pet);
    $main.appendChild(card);
  });
};

const render = async () => {
  await fetchAllPets();
};

render();