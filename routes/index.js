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
    // console.log({ url, query })

    let querySearch = query.search
    let typeSearch = query.type
    // console.log(typeSearch)
    // let newTypeSearch = typeSearch[0].toUpperCase() + typeSearch.slice(1)

    const element = dataInDBJSON.data
    const newElement = element.map(element => {
      return element
    })

    // genres type
    const type = newElement.map(element => element.Type1 && element.Type2)
    const newType = type.filter(element => element !== '')
    newDataType = new Set(newType.map(element => element))

    // config response
    if (querySearch) {
      const pokemonElement = newElement.filter(pokemon => String(pokemon.name) === String(querySearch))
      res.send({ data: pokemonElement });
    } else if (typeSearch) {
      const pokemonSearchType = newElement.filter(pokemon => String(pokemon.types) === String(typeSearch))
      res.send({ data: pokemonSearchType });
    } else {
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
    console.log(pokemons, previousPokemonElement, nextPokemonElement)

    console.log('done filtering pokemon')
    res.send(detail)
  } catch (error) {
    // config error
    next(error);
  }
});

module.exports = router;
