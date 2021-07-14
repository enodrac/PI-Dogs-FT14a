//import style from './Nav.module.css'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory } from 'react-router-dom';
import { createUser, getUser } from '../../actions';

export default function Login(){
    const userStore = useSelector((state) => state.user);
    const history = useHistory();
    const dispatch = useDispatch()

    const [user, setUser] = useState({name:'',email:'',password:'',type:true})

    function handleChange(e){
       setUser({
           ...user,
           [e.target.name]:e.target.value,
       })
    }

    function handleSubmit(e){
        e.preventDefault()
        if(user.name.length){
            createUser(user);
            history.push('/home');
        }else{
            dispatch(getUser(user))
            if(userStore.name)console.log('ENCONTRO')//history.push('/home')
        }
        
    }
    
    return(

        <div>{user.type ? 
            <div>
                <h1>Log in account</h1>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => handleChange(e)} type='email' name='email' placeholder='Email' required />
                    <input onChange={(e) => handleChange(e)} type='password' name='password' placeholder='Password' required />
                    <input type='submit' value='Login' />
                </form>
                <button onClick={() =>  setUser({...user,name:'',email:'',password:'',type:false})}>Register</button>
            </div>
        :
            <div>
                <h1>Create Account</h1>
                <form  onSubmit={handleSubmit}>
                    <input onChange={(e) => handleChange(e)} type='text' name='name' placeholder='Name' required />
                    <input onChange={(e) => handleChange(e)} type='email' name='email' placeholder='Email' required />
                    <input onChange={(e) => handleChange(e)} type='password' name='password' placeholder='Password' required />
                    <input type='submit' value='Register' />
                </form>
            </div>
        }</div>

    )
}