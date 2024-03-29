import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Veedu from './assets/Veedu';
import Location from './assets/Location';
import NewsComponent from './assets/NewsComponent';
import Login from './assets/Login';
import SignUp from './assets/SignUp';
import Request from './assets/Request';
import RequestList from './assets/RequestList';
import PendingList from './assets/PendingList';
import Emergency from './assets/Emergency';
import { MyMap } from './assets/MyMap';
import Chat from './assets/Chat';
import MessageList from './assets/MessageList';
import Profile from './assets/Profile';
import AppRoutes from './assets/AppRoutes';

export const authContext = createContext();

const App = () => {
  const [authState, setAuthState] = useState(localStorage.getItem('authenticated'));

  return (
    <div>
      <authContext.Provider value={[authState, setAuthState]}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </authContext.Provider>
    </div>
  );
};

export default App;