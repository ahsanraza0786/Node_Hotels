const { default: mongoose } = require("mongoose");
const moongose = require(`mongoose`);
// define the MongoDB connection URL
const mongoUrl = "mongodb://127.0.0.1:27017/Hotels"; // replace the database with your data base

// setup mongoDB connection
mongoose.connect(mongoUrl);

// Get the default connections
// Moongose maintain a degault connection object representing the MongoDB connection
const db = mongoose.connection;

//Define the Event Listener for database connection

db.on(`connected`, () => {
  console.log("connected the MongoDB server");
});

db.on(`err`, () => {
  console.log("MongoDB connection error ", err);
});

db.on(`disconnected`, () => {
  console.log("MongoDB disconnected ");
});

// export the database connections 
module.exports=db;