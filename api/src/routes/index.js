const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const { getPokemons, getPokemonId } = require('./controllers/pokemons.js');
const { getTypes } = require('./controllers/types.js');
const axios = require('axios');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ******* GET ALL POKEMONS  *********
router.get('/pokemons', async (req, res) => {
  const { name } = req.query;
  try {
    res.status(200).json(await getPokemons(name));
  } catch (error) {
    res.status(400).json(error.message);
  }
})

// ******* GET POKEMON TYPES *********
router.get('/types', async (req, res) => {
  try {
    const pokemonTypes = await getTypes();
    return res.json(pokemonTypes);
  } catch (error) {
    res.status(400).json(error.message);
  }
})

// ******* GET POKEMON BY ID *********
router.get('/pokemons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).json(await getPokemonId(id));
  } catch (error) {
    res.status(400).json(error.message);
  }
})

module.exports = router;
