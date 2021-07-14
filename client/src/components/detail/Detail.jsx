import styles from './Detail.module.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDog, getDetail, getDogs} from '../../actions';


function Detail() {
    const detailStore = useSelector((state) => state.detail);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(parseInt(window.location.href.split(':').pop())))
     },[dispatch])
     
    return (
        <div>
            {detailStore.id ?
                <div>

                <div>{console.log(detailStore)}</div>
                   
                    <div className={styles.detail_container}>

                        <div >
                            <img className={styles.detail_img} src={detailStore.img} alt="" />
                        </div>

                        <div>

                             <h1>Dog detail</h1>

                                <Link to={'/home'}>
                                    <button onClick={() => {deleteDog(detailStore.id); dispatch(getDogs('', 'ASC', 'name'))}}>X</button>
                                </Link>
                        
                            <div className={styles.detail_dog_info}>

                                <div key={detailStore.id}>
                                    <p> {detailStore.name}</p>
                                    <p>Weight Min: {detailStore.weight_min}</p>
                                    <p>Weight max: {detailStore.weight_max}</p>
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
                <h2>The dog don't exist</h2>
            }
        </div>
    )
}

export default Detail