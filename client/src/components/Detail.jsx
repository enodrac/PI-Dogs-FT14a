import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function Detail(dog){
    const detailStore = useSelector((state) => state.detail);
    useEffect(()=>{
        console.log({detailStore})
    },[])
    return(
        <div>
            {detailStore.id?
            <div>
                <h1>Dog Detail</h1>

                <div key={detailStore.id}>
                    <img width="800px" src={detailStore.img} alt="" />
                    <p>name: {detailStore.name}</p>
                    <p>weight: {detailStore.weight.min}</p>
                    <p>weight: {detailStore.weight.max}</p>
                    <p>height: {detailStore.height}</p>
                    <p>life span: {detailStore.life_span}</p> 
                </div>
                <div>
                    <h4>Temperaments</h4>
                    {detailStore.Temperaments.map(t =>(
                        <div key={t.id}>
                            <p>{t.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            : 
            <h1>error</h1>
        }
        </div>
    )
}

export default Detail