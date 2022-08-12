
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
      const statusFiltered = action.payload === 'All' ? allPokemons : allPokemons.filter(el => el.types.includes(action.payload))
      console.log(statusFiltered)

      return {
        ...state,
        pokemons: statusFiltered,
      }

    default:
      return state
  }
}


export default rootReducer;