import './Home.css'
import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {getDetail, getDogs, getTemperaments} from '../actions/index'
import { useDispatch, useSelector } from "react-redux";

function Home(){
    const dogsStore = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    const dispatch = useDispatch()

    const [selected , setSelected] = useState([])
    const [dogBreed,setDogBreed] = useState([])
    const [temperament,setTemperament] = useState([])
    const [pag, setPag] = useState({pages:[],n:1})

    useEffect(()=>{
        setSelected([...dogsStore]) 
    }, [dogsStore])

    useEffect(()=>{
        setPag({pages:[...selected.slice(0,9)],n:1})
    },[selected])

    useEffect(()=>{
        dispatch(getDogs('','ASC','name')) 
        dispatch(getTemperaments()) 
     },[dispatch])

function handleAddTemp(e){
    if(!temperament.includes(e.target.value) && e.target.value !== 'x')setTemperament(arr => [...arr,e.target.value])
}

function handleSubmit(e){
    e.preventDefault()
    if(dogBreed.length){
        dispatch(getDogs(dogBreed))}
    else if(temperament.length){
        dispatch(getDogs(temperament))
    }
}

function handleCreated(e){
    let aux
    if(e.target.value !== 'all'){
        aux = dogsStore.filter(d => d.created === e.target.value)
        setSelected([...aux])
    }else{setSelected([...dogsStore])}
}

function removeTemp(temp) {
    let aux = temperament;
    let index = aux.indexOf(temp)
    aux.splice(index, 1);
    setTemperament([...aux]);
}

function handlePages(what){
    let pageNumber = pag.n + what 
    let end = 9*pageNumber;
    let start = end - 9
    let page = selected.slice(start,end)
    if(pageNumber && page.length)setPag({pages:[...page],n:pageNumber})
}

function handleOrder(e){
    let orderby = e.target.value,what
    if(e.target.value === 'weight.min'){what = 'weight.min';orderby = 'ASC'}
    else if(e.target.value === 'weight.max'){what = 'weight.max';orderby = 'DESC'}
    dispatch(getDogs('',orderby,what))
}

function redirect(id){
    console.log('A')
    dispatch(getDetail(id))
    window.location.href=`/detail/:${id}`
}

    return(
        <div>

           <h1>Home</h1>

           <Link to={'/dogs'} >Create Dogs</Link>  

           <div>

                <div>
                    {temperament.map((t,i) => (
                        <div key={i}>
                            <label>{t}</label>
                            <button onClick={e => removeTemp(t)}>x</button>
                        </div>
                    ))}
                </div>

                <input onBlur={(e) => setDogBreed(e.target.value)} type="text" placeholder='raza' />
                <button type="submit" onClick={(e) => handleSubmit(e)}>searchDog</button>
                
                <select onChange={handleCreated}>
                    <option value="all">all</option>
                    <option value='false'>Real</option>
                    <option value='true'>Created</option>
                </select>

                <select onChange={handleAddTemp} >
                    <option value='x'>Temperaments...</option>
                    {temperaments.map((e) =>(
                        <option key={e.id}>{e.name}</option>
                    ))}
                </select>
                <button type="submit" onClick={(e) => handleSubmit(e)}>searchTem</button>

            </div>

            <div>
                <select  onChange={handleOrder} >
                    <option value='ASC'>A-Z</option>
                    <option value='DESC'>Z-A</option>
                    <option value='weight.min'>Weight min</option>
                    <option value='weight.max'>Weight max</option>
                </select>
            </div>

            <div>
                <button onClick={(e) => handlePages(-1)}>prev</button>
                <button onClick={(e) => handlePages(1)}>next</button>
            </div>

            <div className='div-dogs'>
                {pag.pages.length?
                 pag.pages.map((d) => (
                    <div className='div-dog' key={d.id} onClick={() => redirect(d.id)} >

                        <div className='div-dog-p'>
                            <p>name: {d.name}</p>
                        </div>
                        
                        <div className='div-dog-img'>
                            <img className='div-dog-img' src={d.img} alt="" />    
                        </div>

                        <div className='div-dog-temperament'>
                            <h4>Temperaments</h4>
                            {d.Temperaments.map(t =>(
                                <div key={t.id}>
                                    <p>{t.name}</p>
                                </div>
                            ))}
                        </div> 

                        {/* onClick={() => dispatch(getDetail(d.id))} */}
                        {/* <Link to={`/detail/:${d.id}`} onClick={() => dispatch(getDetail(d.id))}>DETAIL</Link> */}
                        
                    </div>
                ))   

                : <h3>that dog don't exist</h3> }

            </div>
        </div>
    )
}

export default Home