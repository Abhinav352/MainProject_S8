import React from 'react';
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

const App = () => {
 return (
   <div>
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<Veedu/>} />
         <Route path='/loc' element={<Location/>} />
         <Route path='/News' element={<NewsComponent/>} />
         <Route path='/Login' element={<Login/>} />
         <Route path='/Sign' element={<SignUp/>} />
         <Route path='/Req' element={<Request/>} />
         <Route path="/chat/:roomId" element={<Chat />} />
        <Route path="/messages" element={<MessageList />} />
         <Route path='/List' element={<RequestList/>} />
         <Route path='/Pending' element={<PendingList/>} />
         <Route path='/Emergency' element={<Emergency/>} />
         <Route path='/Map/:latitude/:longitude' element={<MyMap/>} />
       </Routes>
     </BrowserRouter>
   </div>
 )
}

export default App;