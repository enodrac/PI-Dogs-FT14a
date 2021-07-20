import style from './Login.module.css'
import React, { useEffect, useState } from 'react'
import {useHistory } from 'react-router-dom';
import { createUser, getUser } from '../../actions';
import { notAuthenticate } from '../../utils/Utils';

export default function Login(){
    const history = useHistory();

    useEffect(()=>{
        notAuthenticate(history)
    })

    const [user, setUser] = useState({name:'',email:'',password:'',type:true})
    const [error, setError] = useState({error:false})
    
    function handleChange(e){
       setUser({...user,[e.target.name]:e.target.value})
    }

    function handleLogin(e){
        e.preventDefault()
        getUser(user).then(res =>{
            let name = res.data
            if(name.length){
                console.log('sessionStorage',name)
                sessionStorage.setItem('userName',name)
                history.push('/home')
            }else{
                setError({error:true})
            }
        }
        ).catch(err => console.log('ERROR'))
    }
    
    function handleCreate(e){
        e.preventDefault()
        createUser(user);
        setUser({...user, type:true})
    }

    return(

        <div>{user.type ? 
            <div>
                <h1>Log in account</h1>
                <form onSubmit={handleLogin}>
                    <input onChange={handleChange} type='email' name='email' placeholder='Email' value={user.email} required />
                    <input onChange={handleChange} type='password' name='password' placeholder='Password' value={user.password} required />
                    <input className={style.nav_button} type='submit' value='Login' />
                </form>
                {error.error ? <div><p>User not found</p></div>:null}
                <button className={style.nav_button} onClick={() =>  setUser({...user,name:'',email:'',password:'',type:false})}>Register</button>
            </div>
        :
            <div>
                <h1>Create Account</h1>
                <form  onSubmit={handleCreate}>
                    <input onChange={handleChange} type='text' name='name' placeholder='Name' value={user.name} required />
                    <input onChange={handleChange} type='email' name='email' placeholder='Email' value={user.email} required />
                    <input onChange={handleChange} type='password' name='password' placeholder='Password' value={user.password} required />
                    <input className={style.nav_button} type='submit' value='Register' />
                </form>
            </div>
        }</div>

    )
}