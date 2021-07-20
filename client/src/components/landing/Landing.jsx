import style from './Landing.module.css'
import React from 'react'
import { Link } from 'react-router-dom';

export default function Landing(){

    return(
        <div className={style.image}>
            <label>Proyecto Individual</label>
            <Link to={'/home'} >Home</Link>
        </div>
    )
}