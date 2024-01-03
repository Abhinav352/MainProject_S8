import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Location from './assets/Location';
import NewsComponent from './assets/NewsComponent';
import Login from './assets/Login';
import SignUp from './assets/SignUp';
import Chat from './assets/Chat';
import Veedu from './assets/Veedu';
import Request from './assets/Request';
import RequestList from './assets/RequestList';
import PendingList from './assets/PendingList';
import Emergency from './assets/Emergency';
import { MyMap } from './assets/MyMap';

const App = () => {
  return (
    <div>
      <BrowserRouter>
    <Routes>
      <Route path='/'element={<Veedu/>}></Route>
      <Route path='/loc'element={<Location/>}></Route>
      <Route path='/News'element={<NewsComponent/>}></Route>
      <Route path='/Login'element={<Login/>}></Route>
      <Route path='/Sign'element={<SignUp/>}></Route>
      <Route path='/Req'element={<Request/>}></Route>
      <Route path='/Chat'element={<Chat/>}></Route>
      <Route path='/List'element={<RequestList/>}></Route>
      <Route path='/Pending'element={<PendingList/>}></Route>
      <Route path='/Emergency'element={<Emergency/>}></Route>
      <Route path='/Map/:latitude/:longitude'element={<MyMap/>}></Route>

      </Routes>
  </BrowserRouter> 
      
    </div>
  )
}

export default App