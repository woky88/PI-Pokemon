import React from 'react';
import { Link } from 'react-router-dom';
import Page_404 from '../404 page/Page404.gif';

import style from './Page404.module.css';

export default function Page404() {
  return (
    <div className={style.body}>
      <div className={style.container}>
        <img src={Page_404} alt="snorlax" />
        <Link to="/home">
          <button className={style.btn}>Go HomePage</button>
        </Link>
      </div>
    </div>
  )
}