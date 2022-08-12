import React from 'react';
import style from './Card.module.css'

export default function Card({ name, types, img, id }) {


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

  return (
    <div className={style.card}>
      <h1 className={style.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      {
        img ?
          <img src={img} alt="Img not found" height="170px" className={style.img} />
          :
          <img src={`/assets/pokemons/${name}.gif`} alt="Img not found" height="190px" className={style.img} />
      }
      {/* <img className={style.img} src={`/assets/pokemons/${name}.gif`} alt="Img not found" height="190px" /> */}
      <span className={` ${style.typetitle} ${typeC[types]}`}>Types</span>
      <div className={style.types}>
        {
          types && types.map(
            (type) => <img src={`assets/types/${type}.png`} alt={type} key={type} />)
        }
      </div>
    </div >
  )
}