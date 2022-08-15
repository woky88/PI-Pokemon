import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterPokemonsByType, filterPokemonsByCreated, orderByNameOrStrengh } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.jsx';
import Paginado from '../Paginado/Paginado.jsx';
import Navbar from '../NavBar/NavBar.jsx';
import style from './Home.module.css';

export default function Home() {

  let dispatch = useDispatch()
  let allPokemons = useSelector(state => state.pokemons)
  let types = useSelector(state => state.types)


  let [orden, setOrden] = useState('')
  let [currentPage, setCurrentPage] = useState(1);
  let [pokemonsPerPage, setPokemonsPerPage] = useState(12)
  let indexOfLastPokemon = currentPage * pokemonsPerPage;
  let indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  let currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons())
  }, [dispatch])

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

  function handleFilterCreated(e) {
    dispatch(filterPokemonsByCreated(e.target.value))
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByNameOrStrengh(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  return (
    <div className={style.home}>
      <Navbar />
      <div className={style.filter}>
        <button className={style.poke} onClick={e => { handleClick(e) }}>Reload</button>

        <h1 className={style.label}>Filtros :</h1>
        <select onChange={e => handleSort(e)}>
          <option value="normal">Normal</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
          <option value="atkH">Highest Attack</option>
          <option value="atkL">Lowest Attack</option>
        </select>

        <h1 className={style.label}>Created or API :</h1>
        <select onChange={e => handleFilterCreated(e)}>
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
      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}
        page={currentPage}
      />
      <div className={style.cards}>
        {
          currentPokemons.length ?
            typeof currentPokemons[0] === 'object' ?
              currentPokemons.map(el => {
                return (
                  <div>
                    <Link to={`/pokemon/${el.id}`}>
                      <Card name={el.name} types={el.types} img={el.img} id={el.id} />
                    </Link>
                  </div>
                )
              }) :
              <div className={style.notfound}>
                <img src='assets/pikachuConfused.png' alt="Pokemon not found" width='200px' />
                <span className={style.label}>{currentPokemons[0]} not found</span>
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