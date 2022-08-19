import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes, getPokemons } from '../../actions';
import style from './PokemonCreate.module.css';

function validate(input, pokemons) {
  let errors = {};
  let RegExpression = /^[a-zA-Z\s]*$/;

  if (!input.name) {
    errors.name = 'A name is required'
  }
  if (!RegExpression.test(input.name)) {
    errors.name = 'Numbers or special characters are not allowed'
  }
  if (input.name.length > 18) {
    errors.name = `The name can't be longer than 18 characters`
  }

  if (input.hp < 1 || input.hp > 150) {
    if (input.hp < 1) {
      errors.hp = 'The life of the Pokemon must be higher than 1'
    }
    if (input.hp > 150) {
      errors.hp = 'The life of the Pokemon must be less than 150'
    }
  }
  if (input.attack < 1 || input.attack > 200) {
    if (input.attack < 1) {
      errors.attack = 'The attack of the Pokemon must be higher than 1'
    }
    if (input.attack > 200) {
      errors.attack = 'The attack of the Pokemon must be less than 200'
    }
  }
  if (input.defense < 1 || input.defense > 200) {
    if (input.defense < 1) {
      errors.defense = 'The defense of the Pokemon must be higher than 1'
    }
    if (input.defense > 200) {
      errors.defense = 'The defense of the Pokemon must be less than 200'
    }
  }
  if (input.speed < 1 || input.speed > 100) {
    if (input.speed < 1) {
      errors.speed = 'The speed of the Pokemon must be higher than 1'
    }
    if (input.speed > 100) {
      errors.speed = 'The speed of the Pokemon must be less than 100'
    }
  }
  if (input.weight < 1 || input.weight > 1500) {
    if (input.weight < 1) {
      errors.weight = 'The weight of the Pokemon must be higher than 1'
    }
    if (input.weight > 1500) {
      errors.weight = 'The weight of the Pokemon must be less than 1500'
    }
  }
  if (input.height < 1 || input.height > 80) {
    if (input.height < 1) {
      errors.height = 'The height of the Pokemon must be higher than 1 dam'
    }
    if (input.height > 80) {
      errors.height = 'The height of the Pokemon must be less than 80 dam'
    }
  }

  if (!input.types.length) {
    errors.types = 'Must choose a pokemon type'
  }
  if (input.types.length > 2) {
    errors.types = `You can't choose more than 2 types per Pokemon`
  }

  return errors;
}

export default function PokemonCreate() {
  const dispatch = useDispatch()
  const history = useHistory()
  const types = useSelector(state => state.types)
  const [errors, setErrors] = useState({})

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
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
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

      setErrors(validate({
        ...input,
        types: [...input.types, e.target.value]
      }
      ))
    } else if (!e.target.checked) {
      setInput({
        ...input,
        types: input.types.filter(el => el !== e.target.value)
      })

      setErrors(validate({
        ...input,
        types: input.types.filter(el => el !== e.target.value)
      }
      ))
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name == "") {
      alert("Please fill all the fields correctly")
    } else if (input.types == "") {
      alert("Please fill all the fields correctly")
    } else if (input.types.length >= 3) {
      alert("Please fill all the fields correctly")
    } else {
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
              style={input.name.length ? errors.name ? { borderColor: '#e74c3c' } : { borderColor: '#2ecc71' } : {}}
              autocomplete="off"
            />
          </div>
          {
            errors.name ? (
              <div>
                <p className={style.error}>{errors.name}</p>
              </div>
            ) :
              input.name.length ?
                <i style={{ color: '#2ecc71' }}></i>
                :
                <i></i>
          }

          <div>
            <label>HP :</label>
            <input
              type="number"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
              style={input.hp.length ? errors.hp ? { borderColor: '#e74c3c' } : { borderColor: '#2ecc71' } : {}}
            />
          </div>
          {
            errors.hp ? (
              <div>
                <p className={style.error}>{errors.hp}</p>
              </div>
            ) :
              input.hp.length ?
                <i style={{ color: '#2ecc71' }}></i>
                :
                <i></i>
          }

          <div>
            <label>Attack :</label>
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
              style={input.attack.length ? errors.attack ? { borderColor: '#e74c3c' } : { borderColor: '#2ecc71' } : {}}
            />
          </div>
          {
            errors.attack ? (
              <div>
                <p className={style.error}>{errors.attack}</p>
              </div>
            ) :
              input.attack.length ?
                <i style={{ color: '#2ecc71' }}></i>
                :
                <i></i>
          }

          <div>
            <label>Defense :</label>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
              style={input.defense.length ? errors.defense ? { borderColor: '#e74c3c' } : { borderColor: '#2ecc71' } : {}}
            />
          </div>
          {
            errors.defense ? (
              <div>
                <p className={style.error}>{errors.defense}</p>
              </div>
            ) :
              input.defense.length ?
                <i style={{ color: '#2ecc71' }}></i>
                :
                <i></i>
          }

          <div>
            <label>Speed :</label>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
              style={input.speed.length ? errors.speed ? { borderColor: '#e74c3c' } : { borderColor: '#2ecc71' } : {}}
            />
          </div>
          {
            errors.speed ? (
              <div>
                <p className={style.error}>{errors.speed}</p>
              </div>
            ) :
              input.speed.length ?
                <i style={{ color: '#2ecc71' }}></i>
                :
                <i></i>
          }

          <div>
            <label>Weight :</label>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
              style={input.weight.length ? errors.weight ? { borderColor: '#e74c3c' } : { borderColor: '#2ecc71' } : {}}
            />
          </div>
          {
            errors.weight ? (
              <div>
                <p className={style.error}>{errors.weight}</p>
              </div>
            ) :
              input.weight.length ?
                <i style={{ color: '#2ecc71' }}></i>
                :
                <i></i>
          }

          <div>
            <label>Height :</label>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
              style={input.height.length ? errors.height ? { borderColor: '#e74c3c' } : { borderColor: '#2ecc71' } : {}}
            />
          </div>
          {
            errors.height ? (
              <div>
                <p className={style.error}>{errors.height}</p>
              </div>
            ) :
              input.height.length ?
                <i style={{ color: '#2ecc71' }}></i>
                :
                <i></i>
          }

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
            {
              errors.types ? (
                <div className={style.errorTypes}>
                  <p>{errors.types}</p>
                </div>
              ) :
                <i></i>
            }
            <button className={style.btnSubmit} type='submit'> Create Pokemon</button>
          </div>
        </div>
      </form>
    </div>
  )
}

