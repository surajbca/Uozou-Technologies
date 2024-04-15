document
  .getElementById("Login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email + " " + password);
    // Send a POST request to the server
    fetch(`http://localhost:3001/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.getElementById("loginMessage").textContent = data.message;
          document.getElementById("loginMessage").style.color = "green";
          window.location.href = "/Home.html";
        } else {
          document.getElementById("loginMessage").textContent = data.message;
          document.getElementById("loginMessage").style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
