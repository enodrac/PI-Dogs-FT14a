/* eslint-disable react-hooks/exhaustive-deps */
import styles from './Detail.module.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  getDetail, addFavorite, resetDetail} from '../../actions';
import Loading from '../loading/Loading'

function Detail() {
    const detailStore = useSelector((state) => state.detail);
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        dispatch(getDetail(parseInt(window.location.href.split(':').pop())))
        if(detailStore.length)setLoading(false)
         return () => {dispatch(resetDetail())}
    },[dispatch])

    function handleAdd(){
        addFavorite(detailStore.id,sessionStorage.getItem('userName'))
    }

    return (
        <div className={styles.detail_container}>
            {detailStore.id ?
                <div>
                   
                    <div className={styles.detail_container}>

                        <div className={styles.frame}>
                            <img className={styles.detail_img} src={detailStore.img} alt="" />
                        </div>

                        <div className={styles.detail_info_container}>

                             <h1>Dog detail</h1>

                             <div className={styles.div_delFav}>

                                <div>{sessionStorage.getItem('userName') !== null ?
                                    <button className={styles.delete_button} onClick={() => handleAdd()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z"/></svg>
                                        FAV
                                    </button>
                                    :null
                                }</div>
                                
                             </div>
                        
                            <div className={styles.detail_dog_info}>

                                <div key={detailStore.id}>
                                    <p> {detailStore.name}</p>
                                    <p>Weight Min: {detailStore.weight_min}  Max: {detailStore.weight_max}</p>
                                    <p>height: {detailStore.height}</p>
                                    <p>life span: {detailStore.life_span}</p>
                                </div>

                                <div className={styles.detail_dog_temperaments}>
                                    {detailStore.Temperaments.map(t => (
                                        <div key={t.id}>
                                            <p>{t.name}</p>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                : loading ?
                <Loading/>
                    :<img src="https://media1.tenor.com/images/a9a498ac40f5a940f838587eb9d26e89/tenor.gif?itemid=14502312" alt="" />}
        </div>
    )
}

export default Detail