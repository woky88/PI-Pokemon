import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonById } from '../../actions';
import style from './Details.module.css';

export default function Detail(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch])

  let pokemon = useSelector((state) => state.detail)

  function ClearDetail() {
    pokemon.shift();
  }

  return (
    <div>
      <div className={style.nav}>
        <div>
          <Link to='/home'><button onClick={e => ClearDetail()} className={style.btn}>Volver</button></Link>
        </div>
        <img className={style.imgLogo} src='https://fontmeme.com/permalink/220816/e6e6467a8f39aefa5d9ae9cf5f8c011d.png' alt='logo' />
      </div>

      <div className={style.container}>
        {
          pokemon.length > 0 ?
            <>
              <div className={style.containerInfo}>
                <h1 className={style.id}>#{pokemon[0].id}</h1>
                <h1 className={style.name}>{pokemon[0].name.charAt(0).toUpperCase() + pokemon[0].name.slice(1)}</h1>
                {
                  pokemon[0].img ?
                    <img src={pokemon[0].img} alt="Img not found" height="170px" className={style.img} />
                    :
                    <img src={`/assets/pokemons/${pokemon[0].name}.gif`} alt="Img not found" height="300px" className={style.img} />
                }
                <div className={style.types}>
                  {
                    pokemon[0].types ? pokemon[0].types.map(el => {
                      return (
                        <img src={`/assets/type4/${el}.png`} alt="Types" height="50px" key={el} />
                      )
                    }
                    ) :
                      <span>Types not found</span>
                  }
                </div>
              </div>

              <div className={style.containerStats}>
                <div className={style.stats}>
                  <div className={style.bar}>
                    <h1>Hp</h1>
                    <div className={style.progress} ><span className={style.hp} style={{ width: pokemon[0].hp > 100 ? '100%' : pokemon[0].hp + '%' }} per={`${pokemon[0].hp}`}></span></div>
                  </div>

                  <div className={style.bar}>
                    <div className={style.info}>
                      <h1>Attack</h1>
                    </div>
                    <div className={style.progress} style={{ animationDelay: '0.1s' }}><span style={{ width: pokemon[0].attack > 100 ? '100%' : pokemon[0].attack + '%' }} per={`${pokemon[0].attack}`} className={style.attack}></span></div>
                  </div>
                  <div className={style.bar}>
                    <div className={style.info}>
                      <h1>Defense</h1>
                    </div>
                    <div className={style.progress} style={{ animationDelay: '0.2s' }}><span style={{ width: pokemon[0].defense > 100 ? '100%' : pokemon[0].defense + '%' }} per={`${pokemon[0].defense}`} className={style.defense}></span></div>
                  </div>
                  <div className={style.bar}>
                    <div className={style.info}>
                      <h1>Speed</h1>
                    </div>
                    <div className={style.progress} style={{ animationDelay: '0.3s' }}><span style={{ width: pokemon[0].speed > 100 ? '100%' : pokemon[0].speed + '%' }} per={`${pokemon[0].speed}`} className={style.speed}></span></div>
                  </div>

                  <div className={style.container2}>
                    <h1>Weight : {pokemon[0].weight}</h1>
                    <h1>Height : {pokemon[0].height}</h1>
                  </div>
                </div>
              </div>
            </>
            :
            <i></i>
        }
      </div>
    </div>
  )
}