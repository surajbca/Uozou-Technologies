document
  .getElementById("Signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`http://localhost:3001/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.getElementById("signupMessage").textContent =
            "User Signup successfully ";
          document.getElementById("signupMessage").style.color = "green";
          window.location.href = "/login.html";
          //alert("User created successfully");
          // Refresh table
          //fetchUsers();
        } else {
          document.getElementById("signupMessage").style.color = "red";
          document.getElementById("signupMessage").textContent =
            "Failed to Signup user";
          //alert("Failed to create user");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
