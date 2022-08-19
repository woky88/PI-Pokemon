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

// **** Action to filter created or API ****
export function filterPokemonsByCreated(payload) {
  return {
    type: 'FILTER_BY_CREATED',
    payload
  }
}

// **** Action to order pokemons by name ****
export function orderByNameOrStrengh(payload) {
  return {
    type: 'ORDER_BY_NAME',
    payload: payload
  }
}

// **** Action to search by name ****
export function getPokemonName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/pokemons?name=" + name)
      // console.log(json.data)

      return dispatch({
        type: "GET_POKEMON_NAME",
        payload: json.data
      })
    } catch (error) {
      alert("El nombre del pokemon no existe")

    }
  }
}

// **** Action to post pokemon ****
export function postPokemon(payload) {
  return async function (dispatch) {
    const pokemon = await axios.post("http://localhost:3001/pokemons", payload)

    return {
      type: "POST_POKEMON",
      payload: pokemon
    }
  }
}

// **** Action to get pokemon by id ****
export function getPokemonById(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/pokemons/' + id)
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// **** Action to delete pokemon
export function deletePokemon(id) {
  return function (dispatch) {
    return axios.delete('http://localhost:3001/delete/' + id)
      .then(res => dispatch({
        type: "DELETE_POKEMON"
      }))
      .catch(e => console.log(e))
  }
} 
