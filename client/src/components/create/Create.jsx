/* eslint-disable react-hooks/exhaustive-deps */
import styles from'./Create.module.css'
import React,{ useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from '../../actions';
import { authenticate } from '../../utils/Utils';
import { useHistory } from 'react-router-dom';

export default function Create(){
    
const temperaments = useSelector((state) => state.temperaments);
const dispatch = useDispatch()
const history = useHistory()

const [temperament,setTemperament] = useState([])
const [dog,setDog] = useState({name:'',weight_min:1,weight_max:2,height:'',life_span:'',img:'',temperaments:[]})
const [error,setError] = useState({error:false,name:''})

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

async function handleSubmit(e){
    e.preventDefault()
    createDog(dog)
            .then((res) => {
                if(res.data.name)setError({error:true,name:res.data.name})
                else history.push('/home')
            })
            .catch((err) => console.log('error create dog'))

}

    return(
        <div className={styles.div_render}>
            <div className={styles.div_create}>
                
                <h1>Create a new Dog</h1>

                { error.name ? <h2 className={styles.error}>The dog already exist </h2>:null}

                <form onSubmit={handleSubmit} className={styles.dog_form}>

                    <input onChange={(e) => handleChange(e)} name="name" type="text" required placeholder='Name'/>
                    <label>Weight</label>
                    <div>
                        <label> min</label>
                        <input onChange={(e) => handleChange(e)} value={dog.weight_min} min="1" max={dog.weight_max-1} name="weight_min" type="number" required />
                        <label> max</label>
                        <input onChange={(e) => handleChange(e)} value={dog.weight_max} min={dog.weight_min+1} name="weight_max" type="number" required />
                    </div>

                    
                    <input onBlur={handleChange} name="height" type="text" required placeholder='Height'/>
                    
                    <input onBlur={handleChange} name="life_span" type="text" placeholder='Life Span'/>

                    <input onBlur={handleChange} name="img" type="text" placeholder='https://doge.img'/>

                    <select className="temperaments" onChange={handleAddTemp} >
                        <option value='x'>Temperaments...</option>
                        {temperaments.map(e => (
                            <option key={e.id}>{e.name}</option>
                        ))}
                    </select>

                    <button className={styles.dog_button_create} type='submit'>Create</button>
                </form>
                
                

                <div>

                    {temperament.map((t,i) => (
                        <div key={i}>
                            <label>{t}</label>
                            <button className={styles.button} onClick={e => removeTemp(t)}>x</button>
                        </div>
                    ))}
                </div>
            </div> 
        </div>
    )
}