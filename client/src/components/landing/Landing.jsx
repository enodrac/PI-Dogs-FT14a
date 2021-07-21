import styles from './Landing.module.css'
import React from 'react'
import { Link } from 'react-router-dom';

export default function Landing(){

    return(
        <div className={styles.div_render}>
            <div className={styles.items}>
                <label className={styles.title}>THE DOG API</label>
                <Link className={styles.home} to={'/home'} >Home</Link>
            </div>
        </div>
    )
}