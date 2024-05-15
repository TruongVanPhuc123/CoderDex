require("dotenv").config();
var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET all pokemon */
router.get('/pokemons', function (req, res, next) {
  try {
    // change list pokemon in db.json as JavaScript object
    const dataInDBJSON = JSON.parse(fs.readFileSync("db.json", 'utf8'));

    // get query from request
    const { url, query } = req
    console.log({ url, query })

    let querySearch = query.query
    let typeSearch = query.type
    // let newTypeSearch = typeSearch[0].toUpperCase() + typeSearch.slice(1)

    const element = dataInDBJSON.data
    // console.log(element)
    const newElement = element.map(element => {
      return element
    })

    // genres type
    const type = newElement.map(element => element.Type1 && element.Type2)
    const newType = type.filter(element => element !== '')
    newDataType = new Set(newType.map(element => element))
    // console.log(newDataType)


    // filter pokemon name === query search
    const pokemonElement = newElement.filter((pokemon) => pokemon.name === querySearch)
    // console.log(querySearch)
    // console.log(nextPokemonElement)

    // filter pokemon name === type search
    const pokemonSearchType = newElement.filter(pokemon => pokemon.Type1 && pokemon.Type2 === typeSearch)
    // console.log(newTypeSearch)
    // console.log(pokemonSearchType)

    // config response
    if (querySearch) {
      console.log("Reading name response ")
      res.send(pokemonSearchType);
    } else if (typeSearch) {
      console.log("Reading type response")
      res.send(pokemonElement);
    } else {
      console.log("Known data")
      res.send(dataInDBJSON);
    }
  } catch (error) {
    // config error
    next(error);
  }
});

router.get('/pokemons/:id', function (req, res, next) {
  try {
    // get params id from request
    const { params, url } = req
    const id = Number(params.id)
    console.log({ params, url })

    //get pokemon from db.json
    const dataInDBJSON = JSON.parse(fs.readFileSync("db.json", 'utf8'));
    const data = dataInDBJSON.data;
    // console.log(data)

    // filter pokemons by id
    pokemons = data.find(element => element.id === id);

    const previousPokemonElement = data.find((pokemon) => Number(pokemon.id) === id - 1)
    const nextPokemonElement = data.find((pokemon) => Number(pokemon.id) === id + 1)
    const detail = { data: { pokemon: pokemons, previousPokemon: previousPokemonElement, nextPokemon: nextPokemonElement } }
    console.log(pokemons)

    console.log('done filtering pokemon')
    res.send(detail)
  } catch (error) {
    // config error
    next(error);
  }
});

module.exports = router;
