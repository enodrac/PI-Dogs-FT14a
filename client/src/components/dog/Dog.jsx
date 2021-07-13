import './Dog.css'
import React from 'react'

export default function Dog({dog}){
    return(
        <div className='div-dog' key={dog.id} onClick={() => window.location.href = `/detail/:${dog.id}`} >

            <div className='div-dog-name'>
                <label>{dog.name}</label>
            </div>

            <div className='div-dog-info'>

                <div className='div-dog-img'>
                    <img className='dog-img' src={dog.img} alt="" />
                </div>

                <div className='div-dog-temperaments'>
                    {dog.Temperaments.map(t => (
                        <div  key={t.id}>
                            <label>{t.name}</label>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}