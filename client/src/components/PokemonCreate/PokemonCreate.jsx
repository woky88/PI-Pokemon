import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes, getPokemons } from '../../actions';
import style from './PokemonCreate.module.css';

export default function PokemonCreate() {
  const dispatch = useDispatch()
  const history = useHistory()
  const types = useSelector(state => state.types)

  const [input, setInput] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    weight: '',
    height: '',
    img: '',
    types: [],
  })

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleCheck(e) {
    setInput({
      ...input,
      types: [...input.types] // Copia para evitar que el estado este atrasado
    })
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value]
      })
    } else if (!e.target.checked) {
      setInput({
        ...input,
        types: input.types.filter(el => el !== e.target.value)
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input))
    alert("Pokemon created!")
    setInput({
      name: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      weight: '',
      height: '',
      img: '',
      types: [],
    })
    history.push('/home')
  }

  return (
    <div>
      <div className={style.nav}>
        <div>
          <Link to='/home'><button className={style.btn}>Volver</button></Link>
        </div>
        <img className={style.imgLogo} src='https://fontmeme.com/permalink/220814/51163b125bfaf3eef5cb7e4ab1c33a36.png' alt='logo' />
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
        <div className={style.labels}>
          <div>
            <label>Name :</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>HP :</label>
            <input
              type="number"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>Attack :</label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>Defense :</label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>Speed :</label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>Weight :</label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>Height :</label>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label>Image :</label>
            <input
              type="text"
              value={input.img}
              name="img"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className={style.types}>
          {
            types.map(type => (
              <label for={type.name}>
                <div>
                  <input
                    type="checkbox"
                    id={type.name}
                    value={type.name}
                    onChange={(e) => handleCheck(e)}
                  />
                  <div className={style.circle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  ><img src={`assets/type4/${type.name}.png`} alt={`${type.name}`} height="40px" /></div>
                  {/* <div style={{ width: '8px' }}></div> */}
                </div>
              </label>
            ))
          }
          <div className={style.contBtn} >
            <button className={style.btnSubmit} type='submit'> Create Pokemon</button>
          </div>
        </div>
      </form>
    </div>
  )
}

