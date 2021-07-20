/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import styles from './Favorites.module.css'
import React, { useEffect, useState } from 'react'
import {getFavorites, getTemperaments, resetDetail } from '../../actions/index'
import { useDispatch, useSelector } from "react-redux";
import {authenticate,pageCount,handleSearch,handleAddTemp,handleSelected,handleRemoveTemp,handleOrder,handlePages,handleChangeItems} from '../../utils/Utils'
import Dog from '../dog/Dog'
import { useHistory } from 'react-router-dom';

export default function Home() {

    const favoritesStore = useSelector((state) => state.favorites);
    const temperaments = useSelector((state) => state.temperaments);
    const dispatch = useDispatch()
    const history = useHistory();

    const [selected, setSelected] = useState([])
    const [temperament, setTemperament] = useState([])
    const [pag, setPag] = useState({ pages: [], n: 1, max: [], items:9})

    useEffect(() => {
        authenticate(history)
        dispatch(resetDetail())
        dispatch(getFavorites(sessionStorage.getItem('userName')))
        dispatch(getTemperaments())
    }, [dispatch])

    useEffect(() => {
        setSelected([...favoritesStore])
    }, [favoritesStore])

    useEffect(() => {
        let aux = pageCount(pag.items,selected)
        setPag({...pag, pages: [...selected.slice(0, 9)],max:aux, n: 1}) 
    }, [selected])

    return (
        <div className={styles.render_div}>

            <h1>Home</h1>
            
            <div className='div-inputs'>

                <div >
                    <input onChange={(e) => handleSearch(e,favoritesStore,setSelected) } type="text" placeholder='Breed' />
                    <select onChange={(e)=> handleAddTemp(e,temperament,setSelected, selected)} >
                        <option value='x'>Temperaments...</option>
                        {temperaments.map((e) => (
                            <option key={e.id}>{e.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    {temperament.map((t, i) => (
                        <div key={i}>
                            <label>{t}</label>
                            <button className='index' onClick={e => handleRemoveTemp(t, temperament, setTemperament, setSelected, selected,favoritesStore)}>x</button>
                        </div>
                    ))} 
                </div>

            </div>
            
            <div>

                <select onChange={(e) => handleSelected(e, favoritesStore, setSelected)}>
                    <option value="All">All</option>
                    <option value='false'>Real</option>
                    <option value='true'>Created</option>
                </select>

                <select onChange={(e) => handleOrder(e, dispatch, getFavorites,pag ,setPag)} >
                    <option value='ASC'>A-Z</option>
                    <option value='DESC'>Z-A</option>
                    <option value='weight_min'>Weight min</option>
                    <option value='weight_max'>Weight max</option>
                </select>

                <select onChange={(e) => handleChangeItems(e, selected, setPag, pag)} value={pag.items}>
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9} >9</option>
                    <option value={27}>27</option>
                    <option value={54}>54</option>
                    <option value={selected.length}>All</option>
                </select>

            </div>

            <div className='div-dogs-buttons'>

                <button className='prev' onClick={() => handlePages('-', pag.items, pag.max, selected, setPag, pag)}>prev</button>
                    {pag.max.map((e,i) => {
                        if(i > pag.n - 6 && i < pag.n + 6){ 
                            let className = e === pag.n ? 'click-index' : 'index'
                            return <button className={className} key={e} onClick={() => handlePages(e, pag.items, pag.max, selected, setPag, pag)}>{e}</button>
                        }
                    })}
                <button className='next' onClick={() => handlePages('+', pag.items, pag.max, selected, setPag, pag)}>next</button>

            </div>
                    {console.log(pag.pages[0])}
            <div className='div-dogs-container'>
                {pag.pages.length ?
                    pag.pages.map((d) => (
                        <div key={d.id}>
                            <Dog dog={d}></Dog>
                        </div>
                    ))

                    : <h3>that dog doesn't exist</h3>}

            </div>

        </div>
    )
}
