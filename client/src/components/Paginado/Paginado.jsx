import React from "react";
import style from "./Paginado.module.css";

export default function Paginated({ pokemonsPerPage, allPokemons, paginated, page }) {
  const pageNum = [];

  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNum.push(i + 1);
  }

  return (
    <nav>
      <ul className={style.pagination}>
        {
          pageNum &&
          pageNum.map(num => (
            <li key={num} style={{ listStyle: 'none' }}>
              <button className={style.buttons} style={page === num ? { color: "white" } : {}} onClick={() => paginated(num)}>{num}</button>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
