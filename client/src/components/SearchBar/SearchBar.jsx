import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName } from "../../actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch()
  let [name, setName] = useState("")

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== "") {
      dispatch(getPokemonName(name))
      setName(name = "")
    }
  }


  function handleKeyDown(e) {
    setName(e.target.value)
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} >
        <input
          className={style.searchTxt}
          type="text"
          placeholder="Search Pokemon..."
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button type="submit" className={style.searchBtn} style={{ outline: 'none' }}>
          Buscar
        </button>
      </form>
    </div>
  )
}

