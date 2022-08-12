
const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "GET_POKEMONS":
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload,
      }

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      }

    case "FILTER_BY_TYPES":
      const allPokemons = state.allPokemons
      // const statusFiltered = allPokemons.filter(el => el.types[0].name === action.payload)
      const statusFiltered = action.payload === "All" ? allPokemons : allPokemons.filter(el => el.types.map(el => el).includes(action.payload))

      return {
        ...state,
        pokemons: statusFiltered.length ? statusFiltered : [`${action.payload} Pokemons`]
      }

    default:
      return state
  }
}


export default rootReducer;