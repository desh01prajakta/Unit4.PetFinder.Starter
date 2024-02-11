const API_URL = `http://localhost:3000/api`;

const state = {
  pets: [],
};

/**
 * Fetches all pets from the API.
 * @returns {Object[]} the array of recipe objects
 */
const fetchAllPets = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/pets`);
      const json = await response.json();
      renderAllPets(json);
    } catch (err) {
      console.error("Uh oh, trouble fetching pets!", err);
    }
  };
  //DOM elements
const $main = document.querySelector("main");

const createCard = ({
  name,
  breed,
  age,
  owner,
  telephone,
  appointments,
  image,
}) => {
  //create elements
  const card = document.createElement("section");
  const div = document.createElement("div");
  const nameHeader = document.createElement("h2");
  const breedInfo = document.createElement("p");
  const ageInfo = document.createElement("p");
  const ownerInfo = document.createElement("p");
  const telephoneInfo = document.createElement("p");
  const appointmentInfo = document.createElement("ul");
  const img = document.createElement("img");

 
  //add classnames to the elements
  card.className = "card";

  const elements = [
    { element: nameHeader, info: name },
    { element: breedInfo, info: breed },
    { element: ageInfo, info: `age: ${age}` },
    { element: ownerInfo, info: `owner: ${owner}` },
    { element: telephoneInfo, info: `telephone: ${telephone}` },
    { element: appointmentInfo, info: appointments },
    { element: img, info: image },
    
  ];
//add recipe information to the elements
  //add the elements to the DOM
  elements.forEach(({ element, info }) => {
    if (element !== img && element !== breedInfo) {
      element.textContent = info;
    } else if (element !== breedInfo) {
      element.src = info;
    } else {
      element.textContent = "Breed Types:";
      info.forEach((type) => {
        const li = document.createElement("li");
        li.textContent = type;
        element.appendChild(li);
      });
    }

    div.appendChild(element);
  });

  card.appendChild(div);

  //return the new DOM card
  return card;
};
/**
 * Updates `<main>` to display a list of all recipes.
 */
const renderAllPets = (petsList) => {
    //clears the page of any previous elements
    $main.replaceChildren();
  
    //check if the list has recipes
    if (petsList.length < 1) {
      const message = document.createElement("h2");
      message.textContent = "No current pets";
      $main.appendChild(message);
      return;
    }
     //render each recipe
  petsList.forEach((pet) => {
    const card = createCard(pet);
    $main.appendChild(card);
  });
}
const render = async () => {
    await fetchAllPets();
  };
  
  render();