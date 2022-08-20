import React from 'react';
import style from './Card.module.css'
import { deletePokemon, getPokemons } from '../../actions';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

// const PokemonsTypes = require.context('../../assets/type4/', true)

export default function Card({ name, types, img, id }) {

  const PokemonsImages = require.context('../../assets/pokemons', true)
  const PokemonsTypes = require.context('../../assets/type4/', true)

  let typeC = {
    fire: style.fire,
    normal: style.normal,
    fighting: style.fighting,
    flying: style.flying,
    ground: style.ground,
    poison: style.poison,
    rock: style.rock,
    bug: style.bug,
    ghost: style.ghost,
    steel: style.steel,
    water: style.water,
    grass: style.grass,
    electric: style.electric,
    psychic: style.psychic,
    ice: style.ice,
    dragon: style.dragon,
    dark: style.dark,
    fairy: style.fairy,
    unknown: style.unknown,
    shadow: style.shadow
  }

  const dispatch = useDispatch()


  function handleDelete(id) {
    dispatch(deletePokemon(id))
    alert("El pokemon a sido eliminado 😢")
    dispatch(getPokemons())
  }

  return (
    <div className={style.card}>
      <h1 className={style.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      {
        isNaN(id) && <p className={style.btnDelete} onClick={e => handleDelete(id)}>X</p>
      }
      {
        img ?
          <Link className={style.img} to={`/home/${id}`}><img src={img} alt="Img not found" height="170px" /> </Link>
          :
          <Link className={style.img} to={`/home/${id}`}><img src={PokemonsImages(`./${name.charAt(0).toUpperCase() + name.slice(1)}.gif`).default} alt="Img not found" height="190px" className={style.img} /> </Link>
      }
      <span className={` ${style.typetitle} ${typeC[types]}`}>Types</span>
      <div className={style.types}>
        {
          types && types.map(
            (type) => <img src={PokemonsTypes(`./${type}.png`).default} alt={type} key={type} />)
        }
      </div>
    </div >
  )
}