import style from './Nav.module.css'
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Nav(){

    const userStore = useSelector((state) => state.user);
    console.log(userStore)
    return(

        <div className={style.nav_render_div}>

            <div>{ userStore.name ? 
                <div>
                    <div>
                        <Link>
                            <button className={style.nav_button}>Favorites</button>
                        </Link>
                    </div>
                    <Link to={'/logout'}>
                        <button className={style.nav_button}>Logout</button>
                    </Link>
                </div>
                :
                <Link to={'/login'}>
                    <button className={style.nav_button}>Login</button>
                </Link> 
            }</div>


            {/* <button type="button" id="like-button">
                <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
                Like
            </button> */}
            
            <div className={style.nav_button}>user</div>

        </div>
        
    )
}