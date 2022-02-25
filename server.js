// Require express, connection to database, and routes directory
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Require models


const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// Instruct express to listen for PORT
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });