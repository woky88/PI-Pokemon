const axios = require('axios');
const { Pokemon, Type } = require('../../db.js');

// ***** FUNCTION TO GET ALL POKEMONS FOR API *****
const getPokemonsAPI = async () => {
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = Promise.all(
      res.data.results.map(async (poke) => {
        let res2 = await axios.get(poke.url);
        let pokemons = {
          id: res2.data.id,
          name: res2.data.name,
          hp: res2.data.stats[0].base_stat,
          attack: res2.data.stats[1].base_stat,
          defense: res2.data.stats[2].base_stat,
          speed: res2.data.stats[5].base_stat,
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

// ***** FUNCTION TO GET ALL POKEMONS FOR DB *****
const getPokemonsInDb = async () => {

  try {
    const dbPokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
      }
    })
    const pokeArray = [];
    for (let poke of dbPokemons) {
      let pokeType = poke.types.map(t => t.name);
      let pokeInfo = {
        id: poke.id,
        name: poke.name,
        hp: poke.life,
        attack: poke.attack,
        defense: poke.defense,
        speed: poke.speed,
        height: poke.height,
        weight: poke.weight,
        image: poke.image,
        types: pokeType
      };
      pokeArray.push(pokeInfo);
    }
    return pokeArray;
  } catch (error) {
    return error.message;
  }
}

// ****** FUNCTION TO GET ALL POKEMONS (API AND DB) ******
const getAllPokemons = async () => {
  const api = await getPokemonsAPI();
  const database = await getPokemonsInDb();
  const pokemonTotal = [...api, ...database];
  return pokemonTotal;
}

// ****** FUNCTION TO GET POKEMON BY NAME ******
const getByName = async (name) => {
  let PokemonName = name.toLowerCase();
  try {
    const reqId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`);
    const response = await reqId.data;
    let poke = {
      id: response.id,
      name: response.name,
      hp: response.stats[0].base_stat,
      attack: response.stats[1].base_stat,
      defense: response.stats[2].base_stat,
      speed: response.stats[5].base_stat,
      height: response.height,
      weight: response.weight,
      image: response.sprites.other.home.front_default,
      types: response.types.map(t => t.type.name)
    }
    return poke;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getPokemonsAPI,
  getPokemonsInDb,
  getAllPokemons,
  getByName
}