import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';
import style from './NavBar.module.css'

export default function NavBar() {

  const PokemonImages = require.context('../../assets/', true);

  return (
    <nav className={style.nav}>
      <Link to='/'>
        <span>
          <img id="logoPoke" src={PokemonImages(`./logo.png`).default} width="120" alt="landing" />
        </span>
      </Link>
      <SearchBar />
      <Link to="/pokemons"><button className={style.create}>Create</button></Link>
    </nav>
  )
}