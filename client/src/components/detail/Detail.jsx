/* eslint-disable react-hooks/exhaustive-deps */
import styles from './Detail.module.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteDog, getDetail, addFavorite, resetDetail} from '../../actions';


function Detail() {
    const pag = useSelector((state) => state.pag);
    const detailStore = useSelector((state) => state.detail);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch(getDetail(parseInt(window.location.href.split(':').pop())))
         return () => {dispatch(resetDetail())}
    },[dispatch])

    function handleDelete(){
        deleteDog(detailStore.id)
        dispatch({type:'SET_PAG',payload:{...pag,c:0, render:true}})
        dispatch(resetDetail())
        history.push('/home')
    }

    function handleAdd(){
        addFavorite(detailStore.id,sessionStorage.getItem('userName'))
    }

    return (
        <div>
            {detailStore.id ?
                <div>
                   
                    <div className={styles.detail_container}>

                        <div className={styles.frame}>
                            <img className={styles.detail_img} src={detailStore.img} alt="" />
                        </div>

                        <div className={styles.detail_info_container}>

                             <h1>Dog detail</h1>

                             <div className={styles.div_delFav}>

                                {/* <Link to={'/home'}>
                                    <button className={styles.delete_button} onClick={() => deleteDog(detailStore.id)}>Delete</button>
                                </Link> */}

                                    <button className={styles.delete_button} onClick={() => handleDelete()}>Delete</button>

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
                : 
                <h2>The dog doesn't exist</h2>
            }
        </div>
    )
}

export default Detail