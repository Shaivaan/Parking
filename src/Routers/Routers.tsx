import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../components/Home/Home'
import Parking from '../components/Parking/Parking'

export const  Routers=()=> {
  return (
    <div>
      <Routes>
        
        <Route path='/' element= {<Home/>}/>
        <Route path='/parking' element= {<Parking/>}/>
      </Routes>
    </div>
  )
}


