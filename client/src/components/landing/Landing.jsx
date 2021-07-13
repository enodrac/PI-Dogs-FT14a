import React from 'react'
import { Link } from 'react-router-dom';

function Home(){

    return(
        <div>
            <h1>Proyecto Individual</h1>
            <Link to={'/home'} >Home</Link>
        </div>
    )
}

export default Home