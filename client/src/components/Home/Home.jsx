import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterPokemonsByType } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.jsx';
import Paginated from '../Paginado/Paginado.jsx';
import style from './Home.module.css';

export default function Home() {

  const dispatch = useDispatch()
  const allPokemons = useSelector(state => state.pokemons)
  const all = useSelector(state => state.allPokemons)
  const types = useSelector(state => state.types)

  const [pokLoaded, setPokLoaded] = useState(all.length ? true : false)
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginated = (pageNum) => {
    setCurrentPage(pageNum)
  }

  useEffect(() => {
    dispatch(getTypes());
    if (!pokLoaded) {
      dispatch(getPokemons());
    }
  }, [pokLoaded, dispatch])

  useEffect(() => {
    setCurrentPage(1);
  }, [allPokemons.length, setCurrentPage]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterByType(e) {
    dispatch(filterPokemonsByType(e.target.value))
  }

  return (
    <div className={style.home}>
      <Link to='/'></Link>
      <h1>Pokemon PokeDex por mi</h1>

      <div className={style.filter}>
        <button className={style.poke} onClick={e => { handleClick(e) }}>Reload</button>

        <h1 className={style.label}>Filtros :</h1>
        <select>
          <option value="normal">Normal</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
          <option value="atkH">Highest Attack</option>
          <option value="atkL">Lowest Attack</option>
        </select>

        <h1 className={style.label}>Created or API :</h1>
        <select>
          <option value="All">All</option>
          <option value="Api">API</option>
          <option value="Created">Created</option>
        </select>

        <h1 className={style.label}>Types :</h1>
        <select onChange={e => handleFilterByType(e)}>
          <option value="All">all Types</option>
          {
            types?.map(type => (
              <option value={type.name} key={type.name}>{type.name}</option>
            ))
          }
        </select>
      </div>
      <Paginated
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginated={paginated}
        page={currentPage}
      />
      <div className={style.cards}>
        {
          currentPokemons.length ?
            typeof currentPokemons[0] === 'object' ?
              currentPokemons.map(el => {
                return (
                  <div>
                    <Card name={el.name} types={el.types} image={el.img} id={el.id} key={el.id} />
                  </div>
                )
              }) :
              <div className={style.notfound}>
                <img src='assets/pikachuConfused.png' alt="Pokemon not found" width='200px' />
                <span>{currentPokemons[0]} not found</span>
              </div>
            :
            <div className={style.loading}>
              <h1 className={style.loadingText}>Loading...</h1>
              <img src='assets/simple-pokeball-unscreen.gif' alt="Loading.." width='250px' />
            </div>
        }
      </div>
    </div>
  )
}