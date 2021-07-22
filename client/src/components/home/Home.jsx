/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import styles from './Home.module.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {getDogs, getTemperaments } from '../../actions/index'
import { useDispatch, useSelector } from "react-redux";
import {pageCount,handleSearch,handleAddTemp,handleSelected,handleRemoveTemp,handleOrder,handlePages,handleChangeItems} from '../../utils/Utils'
import Dog from '../dog/Dog'

export default function Home() {
    
    const dogsStore = useSelector((state) => state.dogs);
    const temperamentsStore = useSelector((state) => state.temperaments);
    const selectedStore = useSelector((state) => state.selected);
    const pag = useSelector((state) => state.pag);
    const dispatch = useDispatch()

    const [temperament, setTemperament] = useState([])
    
    useEffect(() => {
        if(pag.render)dispatch(getDogs('', 'ASC', 'name'))
        dispatch(getTemperaments())
    }, [dispatch])
    
    useEffect(() => {
        if(pag.render)dispatch({type:'SET_SELECTED',payload:dogsStore}) 
    }, [dogsStore])
    
    useEffect(() => {
        if(pag.render){
            let aux = pageCount(pag.items,selectedStore)
            dispatch({type:'SET_PAG',payload:{...pag, pages: [...selectedStore.slice(0, 9)],max:aux, n: 1,c:pag.c+1}}) 
        }
        if(pag.c > 2){
            dispatch({type:'SET_PAG',payload:{...pag, render:false}}) 
        }
    }, [selectedStore])

    return (
        <div className={styles.render_div}>

            <div className={styles.div_inputs}>

                <div >
                    { sessionStorage.getItem('userName') !== null?
                        <Link className={styles.home_link} to={'/create'} >Create Dogs</Link>:null
                    }

                    <input onChange={(e) => handleSearch(e, dogsStore, selectedStore, dispatch,pag) } type="text" placeholder='Breed' />
                    
                    <select onChange={(e)=> handleAddTemp(e,temperament,dispatch, selectedStore,pag)} >
                        <option value='x'>Temperaments...</option>
                        {temperamentsStore.map((e) => (
                            <option key={e.id}>{e.name}</option>
                        ))}
                    </select>

                </div>

                <div>

                    {temperament.map((t, i) => (
                        <div key={i}>
                            <label>{t}</label>
                            <button className={styles.index} onClick={e => handleRemoveTemp(t, temperament, setTemperament, dispatch,dogsStore,pag)}>x</button>
                        </div>
                    ))} 

                </div>

            </div>
            
            <div>

                <select onChange={(e) => handleOrder(e, dispatch, getDogs,pag)} >
                    <option value="x">Order...</option>
                    <option value='ASC'>A-Z</option>
                    <option value='DESC'>Z-A</option>
                    <option value='weight_min'>Weight min</option>
                    <option value='weight_max'>Weight max</option>
                </select>

                <select onChange={(e) => handleSelected(e, dogsStore, dispatch,pag)}>
                    <option value="All">All</option>
                    <option value='false'>Real</option>
                    <option value='true'>Created</option>
                </select>

                <select onChange={(e) => handleChangeItems(e, selectedStore, dispatch, pag)} value={pag.items}>
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9} >9</option>
                    <option value={27}>27</option>
                    <option value={54}>54</option>
                    <option value={selectedStore.length}>All</option>
                </select>

            </div>

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

            <div className={styles.div_dogs_container}>
                {pag.pages.length ?
                    pag.pages.map((d) => (

                        <div key={d.id}>

                            <Dog dog={d}></Dog>

                        </div>

                    ))

                    : <h1 className={styles.error}>that dog doesn't exist</h1>}

            </div>

        </div>
    )
}