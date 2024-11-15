// server.js
const express = require("express");
const db = require("./db"); // Import and run the MongoDB connection setup from db.js
// const bodyParser = require('body-parser');
// // For parsing JSON
// app.use(bodyParser.json());

const Person = require(`./models/Person`);
const MenuItem = require(`./models/MenuItem`);
// Initialize Express app
const app = express();

// Middleware to parse JSON data
app.use(express.json()); // store data in req.body

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, Welcome to my hotel");
});

// Import the router files
const personRoutes = require(`./routes/personRoutes`);
const menuRoutes = require(`./routes/menuRoutes`);
// use the routes
app.use(`/person`, personRoutes);

app.use(`/menu`, menuRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
