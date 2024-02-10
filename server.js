// import the pets array from data.js
const pets = require('./data');
const path = require("path");

// init express app
const express = require('express');
const server = express();

const PORT = 3001;

//allows us to be able to use style files
server.use(express.static(path.join(__dirname, "public")));

// GET - / - returns homepage
server.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    // serve up the public folder as static index.html file

});

// hello world route
server.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
server.get('/api/v1/pets', (req, res) => {
    // const pets = req.query.name
    
    res.send(pets)
    // send the pets array as a response

});

// get pet by owner with query string
server.get('/api/v1/pets/owner', (req, res) => {
    const ownerType = req.query.type
    // get the owner from the request
    // find the pet in the pets array
    const pet = pets.filter((pet) => pet.ownerType,include(ownerType))
    // const pet = pets.find(pet => pet.owner === owner);
    // send the pet as a response
    res.send(pet)

});

// get pet by name
server.get('/api/v1/pets/:name', (req, res) => {
    const petName = req.params.name;
    // get the name from the request
    // find the pet in the pets array
    const pet = pets.filter(
        (pet) => pet.name.toLowerCase() === petName.toLowerCase()
      );
        // send the pet as a response
    res.send(pet)

});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

