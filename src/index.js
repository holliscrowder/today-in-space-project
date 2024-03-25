import { API_KEY } from "./config.js";

let mailingList = false;

// hide & seek with the mailing list form
const mailingListForm = document.querySelector(".add-space-form");
const mailingListContainer = mailingListForm.parentNode;
const mailingListButton = document.querySelector("#new-space-btn");

mailingListButton.addEventListener("click", () => {
  mailingList = !mailingList;
  if (mailingList) {
    mailingListContainer.style.display = "block";
  } else {
    mailingListContainer.style.display = "none";
  }
});

// newsletter form submit
const submitMailingList = () => {
  mailingListForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newSubscriber = {
      name: event.target.name.value,
      email: event.target.email.value,
    };

    // persist new subscriber to the background
    const postNewSubscriber = async () => {
      response = await fetch("http://localhost:3000/mailingList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newSubscriber),
      });
    };
    postNewSubscriber();
    event.target.reset();
  });
};



const displayPeople = async () => {
  try {
    const response = await fetch("http://localhost:3000/people");
    const people = await response.json();
   
    const peopleInSpace = document.querySelector("#people-in-space");
    // biome-ignore lint/complexity/noForEach: <explanation>
    people.forEach((person) => {
      const peopleImg = document.createElement("img");
      peopleImg.src = person.image;
      peopleImg.alt = `${person.name} photo`;
      peopleImg.className = "people-in-space";

      peopleImg.addEventListener("click", () => {
        handleClick(person);
      });

      peopleInSpace.appendChild(peopleImg);
    });

    // Display info for the first astronaut immediately without having to click
    if (people.length > 0) {
      handleClick(people[0]);
    }
  } catch (error) {
    console.error("Error fetching people:", error);
  }
};

// function to handle click on astronaut image
const handleClick = (person) => {
  const peopleDetailImg = document.querySelector(".detail-image");
  peopleDetailImg.src = person.image;

  const peopleDetailName = document.querySelector("#people-detail .name");
  peopleDetailName.textContent = person.name;

  const peopleDetailNationality = document.querySelector(
    "#people-detail .nationality"
  );
  peopleDetailNationality.textContent = person.nationality;
  const peopleDetailAge = document.querySelector(".age-display");
  peopleDetailAge.textContent = person.age;

  const peopleDetailTimeInSpace = document.querySelector(".time-display");
  peopleDetailTimeInSpace.textContent = person["time in space"];
};


// run code that needs to be executed after the DOM has loaded
const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    submitMailingList();
        // Invoke displayPeople here
        displayPeople();
  });
};

main();