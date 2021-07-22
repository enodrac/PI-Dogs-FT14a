import styles from './Nav.module.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Nav(){
    const pag = useSelector((state) => state.pag);
    const dispatch = useDispatch()

    const [user, setUser] = useState({name:null})

    useEffect(()=>{
        let session = sessionStorage.getItem('userName')
        if(session !== null)setUser({name:session})
    },[])
    return(
        <div>{ user.name !== null? 
            <div className={styles.nav_render_div}>
                <div className={styles.nav_button}>{user.name}</div>
                <Link to={'/favorites'}>
                    <button className={styles.nav_button} onClick={() => dispatch({type:'SET_PAG',payload:{...pag,c:0, render:true}})}>Favorites</button>
                </Link>
                <Link to={'/home'}>
                    <button className={styles.nav_button} onClick={() => {sessionStorage.clear();setUser({name:null})}}>Logout</button>
                </Link>
            </div>
            :
            <div className={styles.nav_render_div}>
                <Link to={'/login'}>
                    <button className={styles.nav_button}>Login</button>
                </Link> 
            </div>
        }</div>
    )
}