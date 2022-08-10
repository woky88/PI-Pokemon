const initialState = {
  pokemons: [],
  allPokemons: [],
}


function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload
      }
  }
}

export default rootReducer;