import React,{ useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from '../actions';


function Dogs(){
    
const temperaments = useSelector((state) => state.temperaments);
const dispatch = useDispatch()

const [dog,setDog] = useState({name:'',weight:{min:0,max:0},height:'',life_span:'',temperaments:[]})
const [temperament,setTemperament] = useState([])

useEffect(()=>{
    setDog({
        ...dog,
        temperaments: [...temperament]
      })
// eslint-disable-next-line react-hooks/exhaustive-deps
},[temperament])

function handleAddTemp(e){
    if(!temperament.includes(e.target.value) && e.target.value !== 'x')setTemperament(arr => [...arr,e.target.value])
}

useEffect(()=>{
    dispatch(getTemperaments()) 
 },[dispatch])

 function handleChange(e) {
    let value = parseInt(e.target.value)
    if(e.target.name === 'min' || e.target.name === 'max' ){
        if(value > 0){
            if(e.target.name === 'max' && value <= dog.weight.min){
                console.log('error weight')
            }
            else{
                setDog(dog => ({
                    ...dog,
                    weight:{...dog.weight,[e.target.name]:value}
                })) 
            }
            
        }
    }
    else if(e.target.name=== 'name' && e.target.value.length){
        setDog(dog => ({
            ...dog,
            [e.target.name]:e.target.value
        }))
    }
    else{
         console.log('error name')
    }
  }

function removeTemp(temp) {
    let aux = temperament;
    let index = aux.indexOf(temp)
    aux.splice(index, 1);
    setTemperament([...aux]);
}

function handleSubmit(e){
    e.preventDefault()
    if(dog.name.length)createDog(dog);
}





    return(
        <div>
            <h1>Create a new Dog</h1>

            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input onChange={(e) => handleChange(e)} name="name" type="text" required placeholder='Name'/>

                <label>Weight</label>
                <input onChange={(e) => handleChange(e)} value={dog.weight.min} min="1" name="min" type="number" required placeholder='Min'/>
                <input onChange={(e) => handleChange(e)} value={dog.weight.max} min={dog.weight.min+1} name="max" type="number" required placeholder='Max'/>
                
                <label>Height</label>
                <input onBlur={handleChange} name="height" type="text" required placeholder='Height'/>
                
                <label>Life span</label>
                <input onBlur={handleChange} name="life_span" type="text" placeholder='Life Span'/>
                
                <select className="temperaments" onChange={handleAddTemp} >
                    <option value='x'>Temperaments...</option>
                    {temperaments.map(e =>(
                        <option key={e.id}>{e.name}</option>
                    ))}
                </select>
                <button type='submit'>Create</button>
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

export default Dogs