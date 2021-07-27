import styles from './Dog.module.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Dog({dog}){
    return(

        <Link className={styles.link_dog} to={`/detail/:${dog.id}` }>
        
            <div className={styles.div_dog} key={dog.id}  >

                <div className={styles.div_dog_name}>
                    <label className={styles.dog_name}>{dog.name}</label>
                </div>

                <div className={styles.div_dog_info}>

                    <div className={styles.div_dog_img}>
                        <img className={styles.dog_img} src={dog.img} alt="" />
                    </div>

                    {/* <div className={styles.div_dog_temperaments}>
                        {dog.Temperaments.map(t => (
                            <div  key={t.id}>
                                <label>{t.name}</label>
                            </div>
                        ))}
                    </div> */}

                </div>

            </div>

        </Link>
        
    )
}