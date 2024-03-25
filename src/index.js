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

// run code that needs to be executed after the DOM has loaded
const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    submitMailingList();
    addAPOD();
  });
};

main();
