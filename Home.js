const socket = io("http://localhost:7500");

const darkMode = document.getElementById("darkMode");
const lightMode = document.getElementById("lightMode");
const Mode = document.getElementById("mode");

const typed = new Typed(".type", {
  strings: ["Web Sites", "Animation", "Application"],
  typeSpeed: 60,
  backSpeed: 60,
  loop: true,
});

const darkModeToggle = document.getElementById("darkModeToggle");
const stylesheet = document.getElementById("stylesheet");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled"); // Store user preference
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});

// Check user preference on page load
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
}

// document.body.style.backgroundColor="skyblue"

/* ***************buttom-top button**************** */

document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", function () {
    // Show or hide the button based on the scroll position

    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    // Scroll to the top of the page when the button is clicked

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});

// *************************************Live Chat***********************************

const name = document.getElementsByClassName("nameInput").value; // for chat user inputname

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".liveChat");
const fileInput = document.getElementById("fileInput");
const sendFileBtn = document.getElementById("sendFileBtn");
var audio = new Audio("./media/ting.mp3");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", { message: message, type: "text" });
  messageInput.value = "";

  uploadFile();
});

// sendFileBtn.addEventListener("click", () => {
const uploadFile = () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileData = {
        fileName: file.name,
        fileType: file.type,
        fileData: reader.result,
      };
      socket.emit("send", { message: fileData, type: "file" });
      appendMediaPreview(fileData, "right");
    };
  }
};

socket.on("receive", (data) => {
  if (data.type === "text") {
    append(`${data.name}: ${data.message}`, "left");
  } else if (data.type === "file") {
    appendMediaPreview(data.message, "left");
  }

  audio.play();
});

function appendMediaPreview(mediaData, position) {
  const mediaElement = document.createElement("div");
  mediaElement.classList.add("media-preview");

  const downloadBtn = document.createElement("button");
  downloadBtn.innerHTML = `<i class="fa-regular fa-circle-down"></i>`;
  downloadBtn.classList.add("download-btn");

  const mediaContent = document.createElement("div");
  mediaContent.classList.add("media-content");

  if (position === "right") {
    mediaContent.innerHTML = `<img src="${mediaData.fileData}" class="media" />`;
    downloadBtn.style.display = "none";
  } else {
    mediaContent.innerHTML = `<img src="${mediaData.fileData}" class="media" style="filter: blur(5px);" />`;
    downloadBtn.style.display = "block";
  }

  mediaElement.appendChild(mediaContent);
  mediaElement.appendChild(downloadBtn);

  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("message");
  messageWrapper.classList.add(position);
  messageWrapper.appendChild(mediaElement);

  messageContainer.appendChild(messageWrapper);
  messageContainer.appendChild(document.createElement("br"));

  // Download Button for image downloading
  downloadBtn.addEventListener("click", () => {
    downloadBtn.style.display = "none";
    mediaContent.style.filter = "none";
    downloadFile(mediaData.fileData, mediaData.fileName);
    mediaContent.innerHTML = `<img src="${mediaData.fileData}" class="media" style="filter: blur(0px);" />`;
  });

  // Clear the input field
  fileInput.value = "";

  // Remove previous media file if present
  const previousMediaPreview = messageContainer.querySelector(".media-preview");
  if (previousMediaPreview) {
    messageContainer.removeChild(previousMediaPreview);
  }
}

// function append(message, position) {
//   const messageElement = document.createElement("div");
//   messageElement.innerText = message;
//   messageElement.classList.add("message");
//   messageElement.classList.add(position);
//   messageContainer.append(messageElement);

//   if (position == "left") {
//     audio.play();
//   }
// }

function append(message, position) {
  if (message.trim() !== "") {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if (position == "left") {
      audio.play();
    }
  }

  // Check if the message container is empty
  const isEmpty = messageContainer.querySelectorAll(".message").length === 0;

  // If the container is empty, hide it
  if (isEmpty) {
    messageContainer.style.display = "none";
  } else {
    messageContainer.style.display = "block";
  }
}

function downloadFile(data, fileName) {
  const a = document.createElement("a");
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// socket.emit("new-user-joined", name);

// // socket.on('user-joined', name => {
// //     append(`${name} joined the chat`, 'right')
// // })

// socket.on("receive", (data) => {
//   append(`${data.name}: ${data.message}`, "left");
// });

// socket.on("left", (data) => {
//   append(`${data.name} left the chat`, "left");
// });

// ***********************************Current Location******************************************

// ********************Popup Start********************

document.querySelector(".location-popup").addEventListener("click", () => {
  document.getElementById("popupContainer").style.display = "block";
});
document.querySelector(".get-pincode").addEventListener("click", () => {
  document.querySelector(".popupContent").style.display = "none";
  // document.querySelector(".popup").style.display = "none";
  document.querySelector(".pincode-container").style.display = "block";
  // alert('working');
});

const back = () => {
  document.querySelector(".popupContent").style.display = "block";
  // document.querySelector(".popup").style.display = "none";
  document.querySelector(".pincode-container").style.display = "none";
};

document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popupContainer").style.display = "none";
  // document.querySelector(".pincode-container").style.display = "none";
});

// Close the popup when clicking anywhere outside of it
window.addEventListener("click", (event) => {
  var popup = document.getElementById("popupContainer");
  if (event.target == popup) {
    popup.style.display = "none";
  }
});

// ********************Popup End********************

const showDetails = document.querySelector(".showDetails");
const districtPincode = document.querySelector(".districtPincode");
const userAddress = document.querySelector(".userAddress");

let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";

let apiKey = "27325e016f9a47a999d461892ad244a0";

const getUserCurrentAddress = async (latitude, longitude) => {
  // console.log(latitude);
  const query = `${latitude}, ${longitude}`;
  let apiUrl = `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    console.log(data);

    const { state_district, postcode, state } = data.results[0].components;
    districtPincode.style.display = "block";
    setTimeout(function () {
      districtPincode.style.display = "none";
    }, 2000);
    districtPincode.textContent = `${state_district}, ${state}`;
    document.querySelector(
      "#upperAdd"
    ).textContent = `${state_district} ${postcode}`;
    // userAddress.textContent = data.results[0].formatted;   //for full address
  } catch (error) {
    console.log(error);
  }
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position)
        const { latitude, longitude } = position.coords;
        // showDetails.textContent = `The latitude ${latitude} & longitude ${longitude}`;

        getUserCurrentAddress(latitude, longitude);
      },
      (error) => {
        showDetails.textContent = error.message;
      }
    );
  }
};

function searchPincode() {
  var pincode = document.getElementById("pincodeInput").value;
  if (!pincode) {
    // alert("Please enter a pincode.");
    document.querySelector("#cityInfo").textContent =
      "Please enter a 6 digit pincode";
    document.querySelector("#cityInfo").style.display = "block";
    setTimeout(function () {
      document.querySelector("#cityInfo").style.display = "none";
    }, 2000);

    return;
  }

  var apiUrl = "https://api.postalpincode.in/pincode/" + pincode;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Extract city name from response
      var cityName = data[0].PostOffice[0].District;
      var stateName = data[0].PostOffice[0].State;
      document.querySelector(
        "#cityInfo"
      ).textContent = `${cityName}, ${stateName}`;
      document.querySelector(
        "#upperAdd"
      ).textContent = `${cityName} ${pincode}`;
      document.querySelector("#cityInfo").style.display = "block";
      setTimeout(function () {
        document.querySelector("#cityInfo").style.display = "none";
      }, 2000);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

/*video chat */
