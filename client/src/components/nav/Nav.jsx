import style from './Nav.module.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Nav(){

    const [user, setUser] = useState({name:null})

    useEffect(()=>{
        let session = sessionStorage.getItem('userName')
        if(session !== null)setUser({name:session})
    },[])
    return(

        <div className={style.nav_render_div}>

            <div>{ user.name !== null? 
                <div className={style.nav_render_div}>
                    <Link to={'/home'}>
                        <button className={style.nav_button} onClick={() => {sessionStorage.clear();setUser({name:null})}}>Logout</button>
                    </Link>
                    <Link to={'/favorites'}>
                        <button className={style.nav_button}>Favorites</button>
                    </Link>
                    <div className={style.nav_button}>{user.name}</div>
                </div>
                :
                <div className={style.nav_render_div}>
                    <Link to={'/login'}>
                        <button className={style.nav_button}>Login</button>
                    </Link> 
                </div>
            }</div>

        </div>
        
    )
}