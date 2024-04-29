const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3306;
// Enable CORS
app.use(cors());

const connection = mysql.createConnection({
  host: "uozoudb.c38kgi0ugm2b.ap-south-1.rds.amazonaws.com",
  user: "root",
  password: "",
  database: "UozouTechnologiesdb",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  connection.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      res.json({ success: false });
    } else {
      console.log("User created successfully");
      res.json({ success: true });
    }
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error finding user:", err);
      res.json({ success: false, message: "Internal server error" });
    } else {
      if (result.length > 0) {
        console.log("User login successful");
        res.json({ success: true, message: "User login successful" });
      } else {
        console.log("Incorrect email or password");
        res.json({ success: false, message: "Incorrect email or password" });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
