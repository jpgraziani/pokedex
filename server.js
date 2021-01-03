require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const POKEDEX = require('./pokedex.json');

const app = express();

app.use(morgan('dev'));

//hardcode to send it back as json as test
const validTypes = ['Bug', 'Dark', `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next()
})

//2. use seperate function to handle the request
function handleGetTypes(req, res) {
  res.json(validTypes)
}

//1. use app.get to construct our endpoint
//3. for End point /types is first arg handleGetTypes is second type. second is a callback func. This done to create reusability
app.get('/types', handleGetTypes)

//these handles are middleware and should happend to validate the request before the app.get
function handleGetPokemon(req, res) {
  res.send("hello Pokemon")
}

app.get('/pokemon', handleGetPokemon)

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});