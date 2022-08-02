const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const { getPokemons } = require('./controllers/pokemons.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ******* GET ALL POKEMONS  *********
router.get('/pokemons', async (req, res) => {
    const pokemons = await getPokemons();
    res.json(pokemons);
})

module.exports = router;
