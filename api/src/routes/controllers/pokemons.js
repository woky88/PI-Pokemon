const axios = require('axios');

const getPokemons = async () => {
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
    const data = Promise.all(
      res.data.results.map(async (poke) => {
        let res2 = await axios.get(poke.url);
        let pokemons = {
          id: data.id,
          name: res2.data.name,
          hp: res2.data.stats[0].base_stat,
          attack: res2.data.stats[1].base_stat,
          defense: res2.data.stats[2].base_stat,
          speed: res2.data.stats[4].base_stat,
          height: res2.data.height,
          weight: res2.data.weight,
          image: res2.data.sprites.other.home.front_default,
          types: res2.data.types.map((type) => {
            return { name: type.type.name };
          })
        }
        return pokemons;
      })
    )
    return data;
  } catch (error) {
    return error;
  }
}


module.exports = {
  getPokemons
}