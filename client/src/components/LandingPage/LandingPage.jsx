import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import video from './LandingVideo.mkv'

export default function LandingPage() {
  return (
    <div>
      <video className={style.video} autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <Link Link to="/home" >
        <button className={style.btn}>
          EXPLORE
        </button>
      </Link >
    </div >
  )
}