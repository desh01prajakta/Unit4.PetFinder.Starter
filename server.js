// import the pets array from data.js
const pets = require('./data');
const path = require("path");

// init express server
const express = require('express');
const server = express();

const PORT = 3000;

//allows us to be able to use style files
server.use(express.static(path.join(__dirname, "public")));

// GET - / - returns homepage
server.get('/', (req, res) => {
        res.send("API is working")
    });

// hello world route
server.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
server.get('/api/v1/pets', (req, res) => {
       // send the pets array as a response
       res.send(pets)
});

// get pet by owner with query string
server.get('/api/v1/pets/owner', (req, res) => {
    const ownerName = req.query.name.toLowerCase();
    // get the owner from the request
    // find the pet in the pets array
    const petsWithOwnerName = pets.filter(pet => pet.owner && pet.owner.toLowerCase() === ownerName);
    // send the pet with owner name as a response
    res.send(petsWithOwnerName);

});

// get pet by name
server.get('/api/v1/pets/:name', (req, res) => {
    const petName = req.params.name;
    // get the name from the request
    // find the pet in the pets array
    const foundPet = pets.find((pet) =>{
        return pet.name === petName;
    })
        // send the pet as a response
    res.send(foundPet)
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

