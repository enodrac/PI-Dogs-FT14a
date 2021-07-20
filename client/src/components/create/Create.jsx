/* eslint-disable react-hooks/exhaustive-deps */
import './Create.css'
import React,{ useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from '../../actions';
import { authenticate } from '../../utils/Utils';
import { useHistory } from 'react-router-dom';

export default function Create(){
    
const temperaments = useSelector((state) => state.temperaments);
const dispatch = useDispatch()
const history = useHistory()

const [dog,setDog] = useState({name:'',weight_min:1,weight_max:2,height:'',life_span:'',img:'',temperaments:[]})
const [temperament,setTemperament] = useState([])

useEffect(()=>{
    authenticate(history)
    setDog({
        ...dog,
        temperaments: [...temperament]
      })
},[temperament])

useEffect(()=>{
    dispatch(getTemperaments()) 
 },[dispatch])

 function handleChange(e) {
    if(e.target.name === 'weight_min' || e.target.name === 'weight_max' ){
        setDog(dog => ({
            ...dog,
            [e.target.name]:parseInt(e.target.value)
        }))
    }
    else{
        setDog(dog => ({
            ...dog,
            [e.target.name]:e.target.value
        }))
    }
  }

function removeTemp(temp) {
    let aux = temperament;
    aux.splice(aux.indexOf(temp), 1);
    setTemperament([...aux]);
}

function handleAddTemp(e){
    if(!temperament.includes(e.target.value) && e.target.value !== 'x')setTemperament(arr => [...arr,e.target.value])
}

function handleSubmit(e){
    e.preventDefault()
    createDog(dog);
}

    return(
        <div className='div-dog-container'>
            <h1>Create a new Dog</h1>

            <form onSubmit={handleSubmit} className='dog-form'>

                <input onChange={(e) => handleChange(e)} name="name" type="text" required placeholder='Name'/>

                <label>Weight</label>
                <input onChange={(e) => handleChange(e)} value={dog.weight_min} min="1" max={dog.weight_max-1} name="weight_min" type="number" required />
                <input onChange={(e) => handleChange(e)} value={dog.weight_max} min={dog.weight_min+1} name="weight_max" type="number" required />
                
                <input onBlur={handleChange} name="height" type="text" required placeholder='Height'/>
                
                <input onBlur={handleChange} name="life_span" type="text" placeholder='Life Span'/>

                <input onChange={(e) => handleChange(e)} name="img" type="text" placeholder='https://doge.img'/>

                <select className="temperaments" onChange={handleAddTemp} >
                    <option value='x'>Temperaments...</option>
                    {temperaments.map(e => (
                        <option key={e.id}>{e.name}</option>
                    ))}
                </select>

                <button className='dog-button-create' type='submit'>Create</button>
            </form>
            
            

            <div>

                {temperament.map((t,i) => (
                    <div key={i}>
                        <label>{t}</label>
                        <button onClick={e => removeTemp(t)}>x</button>
                    </div>
                ))}
            </div>
        </div>
    )
}