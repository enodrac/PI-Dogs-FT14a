/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import styles from './Favorites.module.css'
import React, { useEffect, useState } from 'react'
import { getFavorites, getTemperaments, trick } from '../../actions/index'
import { useDispatch, useSelector } from "react-redux";
import {authenticate,pageCount,handlePages} from '../../utils/Utils'
import Dog from '../dog/Dog'
import { useHistory } from 'react-router-dom';

export default function Home() {
    const favoritesStore = useSelector((state) => state.favorites);
    const dispatch = useDispatch()
    const history = useHistory();

    const [selected, setSelected] = useState([])
    const [pag, setPag] = useState({ pages: [], n: 1, max: [], items:9})

    useEffect(() => {
        authenticate(history)
        dispatch(getFavorites(sessionStorage.getItem('userName')))
        dispatch(getTemperaments())
        return () => {trick(dispatch,pag)}
    }, [dispatch])

    useEffect(() => {
        setSelected(favoritesStore)
    }, [favoritesStore])

    useEffect(() => {
        let aux = pageCount(pag.items,selected)
        setPag({...pag, pages: [...selected.slice(0, 9)],max:aux, n: 1,c:pag.c+1}) 
    }, [selected])

    return (
        <div className={styles.render_div}>

            <h1>FAVORITES</h1>
            
            <div className={styles.div_dogs_buttons}>

                <button className={styles.prev} onClick={() => handlePages('-', pag.items, pag.max, selected, dispatch, pag)}>prev</button>

                    {pag.max.map((e,i) => {
                        if(i > pag.n - 5 && i < pag.n + 5){ 
                            let className = e === pag.n ? 'click-index' : 'index'
                            return <button className={styles[className]} key={e} onClick={() => handlePages(e, pag.items, pag.max, selected, dispatch, pag)}>{e}</button>
                        }
                    })}

                <button className={styles.next} onClick={() => handlePages('+', pag.items, pag.max, selected, dispatch, pag)}>next</button>

            </div>

            <div className={styles.div_dogs_container}>
                {pag.pages.length ?
                    pag.pages.map((d) => (
                        <div key={d.id}>
                            <Dog dog={d}></Dog>
                        </div>
                    ))

                    : <h3 className={styles.error}>that dog doesn't exist</h3>}

            </div>

        </div>
    )
}