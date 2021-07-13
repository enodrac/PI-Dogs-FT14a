import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../actions';

function Detail(dog) {
    const detailStore = useSelector((state) => state.detail);
    const dispatch = useDispatch()

    return (
        <div>
            {detailStore.id ?
                <div>
                    <h1>Dog detail</h1>

                    <div className='div-detail-img'>
                        <img width="800px" src={detailStore.img} alt="" />
                    </div>

                    <div className='div-detail-info' key={detailStore.id}>
                        <p>name: {detailStore.name}</p>
                        <p>Minimum weight: {detailStore.weight_min}</p>
                        <p>Maximum weight: {detailStore.weight_max}</p>
                        <p>height: {detailStore.height}</p>
                        <p>life span: {detailStore.life_span}</p>
                    </div>
                    <div>
                        <h4>Temperaments</h4>
                        {detailStore.Temperaments.map(t => (
                            <div key={t.id}>
                                <p>{t.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                :
                dispatch(getDetail(parseInt(window.location.href.split(':').pop())))
            }
        </div>
    )
}

export default Detail