import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import AppDawnload from './components/AppDawnload/AppDawnload'
import LoginPopup from './components/LoginPopup/LoginPopup'

const App = () => {

const[showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}   
    {/* ternaryoprator if true then only loginpopup component will show  */}
    <div className='app'>
      <Navbar setShowLogin= {setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
      </Routes>
    </div>
    <AppDawnload/>
    <Footer/>
    </>
  )
}

export default App
