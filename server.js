// import the pets array from data.js
const pets = require("./data");
//import path to be able to add styles to our application
const path = require("path");

const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());

// Your other middleware and routes...

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});


//allows us to be able to use style files
app.use(express.static(path.join(__dirname, "public")));

// GET - / - returns homepage
app.get("/", (req, res) => {
  // serve up the public folder as static index.html file
  res.sendFile(__dirname + "/public/dist/index.html");
});

// hello world route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// get all pets from the database
app.get("/api/v1/pets", (req, res) => {
  // send the pets array as a response
  res.send(pets);
});

// get pet by owner with query string
app.get("/api/v1/pets/owner", (req, res) => {
  // get the owner from the request
  const owner = req.query.owner;

  // find the pet in the pets array
  const pet = pets.find(
    (pet) => pet.owner.toLowerCase() === owner.toLowerCase()
  );

  // send the pet as a response
  res.send(pet);
});

// get pet by name
app.get("/api/v1/pets/:name", (req, res) => {
  // get the name from the request
  const name = req.params.name;

  // find the pet in the pets array
  const pet = pets.find((pet) => pet.name.toLowerCase() === name.toLowerCase());

  // send the pet as a response
  res.send(pet);
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;