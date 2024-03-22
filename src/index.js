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

    newSubscriber = {
      name: event.target.name.value,
      email: event.target.name.email,
    };

    // persist new subscriber to the background
    const postNewSubscriber = async () => {
      response = await fetch("our db.json URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringigy(newSubscriber),
      });
    };
    postNewSubscriber();
    event.target.reset();
  });
};

// run code that needs to be executed after the DOM has loaded
const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    submitMailingList();
  });
};

main();
