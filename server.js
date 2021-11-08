// Dependencies 
const express = require('express');
const routes = require('./routes');
// Import sequelize connection
const sequelize = require('./config/connection')

// Express function 
const app = express();
// Port 
const PORT = process.env.PORT || 3001;

// Data parsing 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes 
app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
  });
});
