
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
        pokemons: action.payload,
        allPokemons: action.payload,
      }
    case "GET_POKEMON_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      }

    case "POST_POKEMON":
      return {
        ...state
      }

    case "FILTER_BY_TYPES":
      const allPokemons = state.allPokemons
      // const statusFiltered = allPokemons.filter(el => el.types[0].name === action.payload)
      const statusFiltered = action.payload === "All" ? allPokemons : allPokemons.filter(el => el.types.map(el => el).includes(action.payload))

      return {
        ...state,
        pokemons: statusFiltered.length ? statusFiltered : [`${action.payload} Pokemons`]
      }

    case "FILTER_BY_CREATED":
      const createdFilter = action.payload === 'Created' ? state.allPokemons.filter(el => el.createdPokemonDb) : state.allPokemons.filter(el => !el.createdPokemonDb)

      return {
        ...state,
        pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
      }

    case "ORDER_BY_NAME":
      let sortedArray

      if (action.payload === 'asc') {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return;
          }
          return 0;
        })

      }
      if (action.payload === 'desc') {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      }
      if (action.payload === 'atkH') {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return -1;
          }
          if (b.attack > a.attack) {
            return 1;
          }
          return 0;
        })
      }
      if (action.payload === 'atkL') {
        sortedArray = state.pokemons.sort(function (a, b) {
          if (a.attack > b.attack) {
            return 1;
          }
          if (b.attack > a.attack) {
            return -1;
          }
          return 0;
        })
      }
      if (action.payload === 'normal') {
        const apiPokes = state.pokemons.filter(el => !el.createdInDb).sort(function (a, b) {
          if (a.id > b.id) {
            return 1;
          }
          if (b.id > a.id) {
            return -1;
          }
          return 0;
        })
        const dbPokes = state.pokemons.filter(el => el.createdInDb).sort(function (a, b) {
          if (a.id > b.id) {
            return 1;
          }
          if (b.id > a.id) {
            return -1;
          }
          return 0;
        })
        sortedArray = [...apiPokes, ...dbPokes]
      }

      return {
        ...state,
        pokemons: sortedArray
      }

    default:
      return state
  }
}


export default rootReducer;