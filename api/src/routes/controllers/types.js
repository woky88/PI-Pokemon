const axios = require('axios');
const { Type } = require('../../db.js');

const getTypes = async () => {
  try {

    let pokemonDb = await Type.findAll();
    if (pokemonDb.length > 0) {
      return pokemonDb;

    } else {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      const data = Promise.all(
        response.data.results.map(async poke => {
          let types = await Type.create({
            name: poke.name,
          });
          return types;
        })
      );
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getTypes
}