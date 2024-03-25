import { API_KEY } from "./config.js";

// hide & seek with the mailing list form
let mailingList = false;
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

// Add NASA photo of the day
const addAPOD = () => {
  // fetch photo of the day from NASA API:
  const fetchAPOD = async () => {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
    );
    const apod = await response.json();
    const apodDIV = document.querySelector("#space-collection");

    // display APOD image
    if (apod.media_type === "image") {
      const apodImg = document.createElement("img");
      apodImg.id = "apod-img";
      apodImg.src =
        "https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2020/04/041520_mt_supernova_feat.jpg?fit=1028%2C579&ssl=1";
      apodImg.alt = "NASA photo of the day";

      // add image "explanation" button
      const apodImgButton = document.createElement("button");
      apodImgButton.id = "apod-img-button";
      apodImgButton.textContent = "Explanation";

      apodDIV.append(apodImg, apodImgButton);

      // add explanation when "explanation" button is clicked
      const apodImgExplanation = document.createElement("p");
      apodImgExplanation.id = "apod-img-explanation";
      apodImgExplanation.textContent = apod.explanation;
      let imgExplanationFlag = false;
      apodImgButton.addEventListener("click", () => {
        imgExplanationFlag = !imgExplanationFlag;
        apodDIV.append(apodImgExplanation);
        if (imgExplanationFlag) {
          apodImgExplanation.style.display = "block";
        } else {
          apodImgExplanation.style.display = "none";
        }
      });
    }
    // display APOD video
    else if (apod.media_type === "video") {
      const apodVideo = document.createElement("iframe");
      apodVideo.id = "apod-video";
      apodVideo.src = apod.url;
      apodVideo.allowFullscreen = "true";
      apodVideo.muted = "true";
      apodVideo.preload = "true";
      apodVideo.poster =
        "https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2020/04/041520_mt_supernova_feat.jpg?fit=1028%2C579&ssl=1";
      apodVideo.allowFullscreen = "true";

      // add video "explanation" button
      const apodVideoButton = document.createElement("button");
      apodVideoButton.id = "apod-video-button";
      apodVideoButton.textContent = "Explanation";
      apodDIV.append(apodVideo, apodVideoButton);

      // add explanation when "explanation" button is clicked
      const apodVideoExplanation = document.createElement("p");
      apodVideoExplanation.id = "apod-video-explanation";
      apodVideoExplanation.textContent = apod.explanation;
      let videoExplanationFlag = false;
      apodVideoButton.addEventListener("click", () => {
        videoExplanationFlag = !videoExplanationFlag;
        apodDIV.append(apodVideoExplanation);
        if (videoExplanationFlag) {
          apodVideoExplanation.style.display = "block";
        } else {
          apodVideoExplanation.style.display = "none";
        }
      });

      // }
    }
  };
  fetchAPOD();
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
    addAPOD();
        // Invoke displayPeople here
        displayPeople();
  });
};

main();