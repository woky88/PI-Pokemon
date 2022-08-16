const axios = require('axios');
const { Pokemon, Type } = require('../../db.js');

// ***** FUNCTION TO GET ALL POKEMONS FOR API *****
const getPokemonsAPI = async () => {
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40&offset=150');
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
            // return { name: type.type.name };
            return type.type.name;
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
const getDbInfo = async () => {
  const data = (await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })).map(pokemon => {
    const json = pokemon.toJSON();
    return {
      ...json,
      types: json.types.map(type => type.name)
    }
  });

  return data
}

// ****** FUNCTION TO GET ALL POKEMONS (API AND DB) ******
const getAllPokemons = async () => {
  const api = await getPokemonsAPI();
  const database = await getDbInfo();
  const pokemonTotal = api.concat(database);
  return pokemonTotal;
}

// ****** FUNCTION TO GET POKEMON BY NAME ******
// const getByName = async (name) => {
//   let PokemonName = name.toLowerCase();
//   try {
//     const reqId = await axios.get("https://pokeapi.co/api/v2/pokemon/" + PokemonName);
//     const response = reqId.data;
//     let poke = [{
//       id: response.id,
//       name: response.name,
//       hp: response.stats[0].base_stat,
//       attack: response.stats[1].base_stat,
//       defense: response.stats[2].base_stat,
//       speed: response.stats[5].base_stat,
//       height: response.height,
//       weight: response.weight,
//       image: response.sprites.other.home.front_default,
//       types: response.types.map(t => t.type.name)
//     }];
//     return poke;
//   } catch (error) {
//     console.log(error)
//   }
// }

const getPokeInfoxName = async (name) => {
  try {
    const apiPokeUrl = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + name
    );
    const results = apiPokeUrl.data;

    const pokemonInfo = {
      id: results.id,
      name: results.name,
      types: results.types.map((t) => t.type.name),
      image: results.sprites.other["official-artwork"].front_default,
      weight: results.weight,
      height: results.height,
    };
    console.log(pokemonInfo);

    return pokemonInfo;
  } catch (e) {
    if (e.status === 404) return null;
  }
};

//*** Function to get info by ID */
const getPokeInfo = async (id) => {
  try {
    const apiPokeUrl = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
    const results = apiPokeUrl.data;

    const pokemonInfo = {
      id: results.id,
      name: results.name,
      types: results.types.map((t) => t.type.name),
      image: results.sprites.other['official-artwork'].front_default,
      hp: results.stats[0].base_stat,
      attack: results.stats[1].base_stat,
      defense: results.stats[2].base_stat,
      speed: results.stats[5].base_stat,
      weight: results.weight,
      height: results.height,
    }
    console.log(pokemonInfo)

    return pokemonInfo;
  } catch (e) {
    console.error(e);
    if (e.status === 404) return null;
  }
}

module.exports = {
  getPokemonsAPI,
  getDbInfo,
  getAllPokemons,
  getPokeInfoxName,
  getPokeInfo
}