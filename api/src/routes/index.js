const { Router } = require('express');
const { getAllPokemons, getPokeInfoxName, getDbInfo, getPokeInfo } = require('./controllers/pokemons.js');
const { getTypes } = require('./controllers/types.js');
const { Pokemon, Type } = require('../db.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ******* GET ALL POKEMONS  *********
router.get('/pokemons', async (req, res) => {
  const name = req.query.name;

  if (name) {
    const pokemonName = await getPokeInfoxName(name.toLowerCase());

    if (pokemonName) {
      return res.status(200).send([pokemonName]);
    } else {
      const pokemonsDB = await getDbInfo();
      const pokemonNAM = pokemonsDB.filter(
        el => el.name.toLowerCase() == name.toLowerCase()
      );

      return pokemonNAM.length
        ? res.status(200).send(pokemonNAM)
        : res.status(404).send("Pokemon not found");
    }
  } else {
    const pokemonsTotal = await getAllPokemons();

    return res.status(200).send(pokemonsTotal);
  }
});

// ******* GET POKEMON BY ID *********
router.get('/pokemons/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params

  let pokemonInfo;
  if (idPokemon >= 1 && idPokemon <= 898 || idPokemon >= 10001 && idPokemon <= 10220) {
    const pokemonInfo = await getPokeInfo(idPokemon)

    return pokemonInfo ?
      res.status(200).send([pokemonInfo]) :
      res.status(404).send('Pokemon not found')
  }

  const pokemonsTotal = await getDbInfo()

  if (!pokemonInfo && idPokemon) {
    const pokemonId = pokemonsTotal.filter(el => el.id == idPokemon)

    return pokemonId.length ?
      res.status(200).send(pokemonId) :
      res.status(404).send('Pokemon not found')
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

//*** Delete pokemon ***
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  try {
    const pokemon = await Pokemon.findByPk(id)
    if (pokemon) {
      await pokemon.destroy()
      res.send("Pokemon muerto!!")
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
