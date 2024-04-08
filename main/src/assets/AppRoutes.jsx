import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Veedu from '../assets/Veedu';
import Location from '../assets/Location';
import NewsComponent from '../assets/NewsComponent';
import Login from '../assets/Login';
import SignUp from '../assets/SignUp';
import Request from '../assets/Request';
import RequestList from '../assets/RequestList';
import PendingList from '../assets/PendingList';
import Emergency from '../assets/Emergency';
import { MyMap } from '../assets/MyMap';
import Chat from '../assets/Chat';
import MessageList from '../assets/MessageList';
import Profile from '../assets/Profile';
import NavBar from '../assets/NavBar';
import OtherProfile from './OtherProfile';
import InitialResponse from './InitialResponse';
import DisasterPage from './DisasterPage';
import ForgotPassword from './ForgotPassword';
import PasswordReset from './PasswordReset';

const AppRoutes = () => {
  const location = useLocation();
  const showNavBar = !location.pathname.startsWith('/chat/');

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Location />} />
        <Route path="/loc" element={<Veedu />} />
        <Route path="/News" element={<NewsComponent />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<SignUp />} />
        <Route path="/Req" element={<Request />} />
        <Route path="/chat/:roomId" element={<Chat />} />
        <Route path="/messages" element={<MessageList />} />
        <Route path="/List" element={<RequestList />} />
        <Route path="/Pending" element={<PendingList />} />
        <Route path="/Emergency" element={<Emergency />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Response" element={<InitialResponse/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<PasswordReset />} />
        <Route path="/disaster/:id" element={<DisasterPage />} />
        <Route path="/Map/:latitude/:longitude" element={<MyMap />} />
        <Route path="/otherProfile/:userEmail" element={<OtherProfile />} />
      
      </Routes>
    </>
  );
};

export default AppRoutes;