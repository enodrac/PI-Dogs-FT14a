/* eslint-disable array-callback-return */
import styles from './Buttons.module.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handlePages } from '../../utils/Utils';

export default function Loading(){

    const selectedStore = useSelector((state) => state.selected);
    const pag = useSelector((state) => state.pag);
    const dispatch = useDispatch()

    return(
        <div className={styles.div_dogs_buttons}>

                <button className={styles.prev} onClick={() => handlePages('-', pag.items, pag.max, selectedStore, dispatch, pag)}>prev</button>

                    {pag.max.map((e,i) => {
                        if(i > pag.n - 5 && i < pag.n + 5){ 
                            let className = e === pag.n ? 'click-index' : 'index'
                            return <button className={styles[className]} key={e} onClick={() => handlePages(e, pag.items, pag.max, selectedStore, dispatch, pag)}>{e}</button>
                        }
                    })}
                
                <button className={styles.next} onClick={() => handlePages('+', pag.items, pag.max, selectedStore, dispatch, pag)}>next</button>

            </div>
    )
}