const { Router } = require('express');
const { getAllPokemons, getPokemonsInDb, getByName } = require('./controllers/pokemons.js');
const { getTypes } = require('./controllers/types.js');
const { Pokemon, Type } = require('../db.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ******* GET ALL POKEMONS  *********
router.get('/pokemons', async (req, res) => {
  const { name } = req.query;
  try {
    let pokemonDB = await getPokemonsInDb();
    if (name) {
      const pokemonApi = await getByName(name)
      let pokeName = pokemonDB.find(poke => poke.name.toLowerCase() === name.toLowerCase())
      if (pokemonApi) return res.status(200).json(pokemonApi);
      if (pokeName) return res.status(200).json(pokeName);
      else return res.status(400).send("El nombre del pokemon no existe 😒")
    } else {
      const PokeTotal = await getAllPokemons();
      return res.status(200).json(PokeTotal);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
})

// ******* GET POKEMON BY ID *********
router.get('/pokemons/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const pokemonTotal = await getAllPokemons()
    if (id) {
      let pokemonId = await pokemonTotal.filter(poke => poke.id == id)
      pokemonId.length ?
        res.status(200).json(pokemonId) :
        res.status(404).json({ message: 'Pokemon not found' })
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
})

// ******* CREATE POKEMON (POST) *********
router.post('/pokemons', async (req, res) => {
  const {
    name,
    types,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    img,
    createdPokemonDb
  } = req.body;
  try {
    if (name) {
      const pokemonCreated = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
        createdPokemonDb
      })

      const pokemonTypes = await Type.findAll({
        where: { name: types }
      })

      pokemonCreated.addType(pokemonTypes)
      return res.send('Pokemon created 😊')
    } else {
      return res.status(400).send('Pokemon name is required')
    }
  }
  catch (error) {
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

module.exports = router;
