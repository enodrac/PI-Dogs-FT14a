/* eslint-disable react-hooks/exhaustive-deps */
import styles from './Login.module.css'
import React, { useEffect, useState } from 'react'
import {useHistory } from 'react-router-dom';
import { createUser, getUser } from '../../actions';
import { notAuthenticate } from '../../utils/Utils';

export default function Login(){
    const history = useHistory();
    
    const [user, setUser] = useState({name:'',email:'',password:'',type:true,found: false})
    const [error, setError] = useState({error:false})

    useEffect(()=>{
        notAuthenticate(history)
    },[])
    
    function handleChange(e){
       setUser({...user,[e.target.name]:e.target.value})
    }

    function handleLogin(e){
        e.preventDefault()
        getUser(user).then((res) =>{
            let name = res.data.name
            if(name){
                sessionStorage.setItem('userName',name)
                history.push('/home')
            }else{
                setError({error:true})
            }
        }
        ).catch(err => console.log('error get user' , err))
    }
    
    function handleCreate(e){
        e.preventDefault()
        createUser(user).then((res) =>{
            if(res.data.name){
                setUser({...user, type:true,found:true})
            }
            else{
                setUser({...user, type:true,found:false})
                setError({error:false})
            }
        })
        .catch((err) => console.log('error create user' , err))
    }

    return(

        <div>{user.type ? 
            <div>
                <h1>Log in account</h1>
                <form onSubmit={handleLogin}>
                    <input onChange={handleChange} type='email' name='email' placeholder='Email' value={user.email} required />
                    <input onChange={handleChange} type='password' name='password' placeholder='Password' value={user.password} required />
                    <input className={styles.nav_button} type='submit' value='Login' />
                </form>
                {error.error ? <div><label className={styles.error}>User not found</label></div>:user.found ? <div><label className={styles.error}>This user {user.name} already exist</label></div>:null}
                
                <button className={styles.nav_button} onClick={() =>  setUser({...user,name:'',email:'',password:'',type:false})}>Register</button>
            </div>
        :
            <div>
                <h1>Create Account</h1>
                <form  onSubmit={handleCreate}>
                    <input onChange={handleChange} type='text' name='name' placeholder='Name' value={user.name} required />
                    <input onChange={handleChange} type='email' name='email' placeholder='Email' value={user.email} required />
                    <input onChange={handleChange} type='password' name='password' placeholder='Password' value={user.password} required />
                    <input className={styles.nav_button} type='submit' value='Register' />
                </form>
            </div>
        }</div>

    )
}