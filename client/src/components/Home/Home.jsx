import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../actions';
import { Link } from 'react-router-dom';

export default function Home() {

  const dispatch = useDispatch()
  const allPokemons = useSelector((state) => state.pokemons)
  const types = useSelector(state => state.types)

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  return (
    <div>
      <Link to='/'></Link>
      <h1>Pokemon PokeDex por mi</h1>
      <button onClick={e => { handleClick(e) }}>Reload</button>

      <div>

        <select>
          <option value="normal">Normal</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
          <option value="atkH">Highest Attack</option>
          <option value="atkL">Lowest Attack</option>
        </select>

        <select>
          <option value="All">All</option>
          <option value="Api">API</option>
          <option value="Created">Created</option>
        </select>

        <select value="AllTypes">
          {
            types.map(type => (
              <option value={type.name} key={type.name}>{type.name}</option>
            ))
          }
        </select>
      </div>
    </div>

  )

}