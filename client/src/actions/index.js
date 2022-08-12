import axios from 'axios'


// **** Action to get all pokemons ****
export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/pokemons', {})
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data
    })
  }
}

// **** Action to get types ****
export function getTypes() {
  return async function (dispatch) {
    var types = await axios.get("http://localhost:3001/types")
    return dispatch({
      type: "GET_TYPES",
      payload: types.data
    })
  }
}

// **** Action to filter pokemons for type ****
export function filterPokemonsByType(payload) {
  return {
    type: 'FILTER_BY_TYPES',
    payload
  }
}
