require("dotenv").config();
var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET all pokemon */
router.get('/pokemons', function (req, res, next) {
  try {
    // change list pokemon in db.json as JavaScript object
    const data = JSON.parse(fs.readFileSync("db.json", 'utf8'));

    // get query from request
    const { url, query } = req
    console.log({ url, query })

    let querySearch = query.query
    let typeSearch = query.type
    // let newTypeSearch = typeSearch[0].toUpperCase() + typeSearch.slice(1)

    const element = data.products
    const newElement = element.map(element => {
      return element.element
    })

    // genres type
    const type = newElement.map(element => element.Type1 && element.Type2)
    const newType = type.filter(element => element !== '')
    newDataType = new Set(newType.map(element => element))
    // console.log(newDataType)

    // filter pokemon name === query search
    const pokemonSearchName = newElement.filter(pokemon => pokemon.Name === querySearch)
    // console.log(newTypeSearch)
    // console.log(pokemonSearchType)

    // filter pokemon name === type search
    const pokemonSearchType = newElement.filter(pokemon => pokemon.Type1 && pokemon.Type2 === typeSearch)
    // console.log(newTypeSearch)
    // console.log(pokemonSearchType)

    // config response
    if (querySearch) {
      console.log("Reading name response ")
      res.send(pokemonSearchName);
    } else if (typeSearch) {
      console.log("Reading type response")
      res.send(pokemonSearchType);
    } else {
      console.log("Known data")
      res.send(data);
    }
  } catch (error) {
    // config error
    next(error);
  }
});

router.get('/api/pokemons/:id', function (req, res, next) {
  try {
    // get params id from request
    const { params, url } = req
    const id = params.id
    // console.log({ params, url })

    //get pokemon from db.json
    const data = JSON.parse(fs.readFileSync("db.json", 'utf8'));
    const products = data.products;
    // console.log(products)

    // filter pokemons by id
    pokemons = products.filter(element => element.id === Number(id));
    // console.log(pokemons)

    console.log('done filtering pokemon')
    res.send(pokemons)
  } catch (error) {
    // config error
    next(error);
  }
});

module.exports = router;
