import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Auth from './routes/Auth';
import Chats from './routes/Chats';
import Chatting from './routes/Chatting';
import Find from './routes/Find';
import Friends from './routes/Friends';
import FriendsProfileInfo from './routes/FriendsProfileInfo';
import More from './routes/More';
import MyProfileInfo from './routes/MyProfileInfo';

function AppRouter({ isLoggedIn, userObj }) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Friends userObj={userObj} />} />
          </>
        ) : (
          <Route path='/' element={<Auth />} />
        )}
        <Route path='/myprofileinfo' element={<MyProfileInfo userObj={userObj} />} />
        <Route path='/friendsprofileinfo' element={<FriendsProfileInfo userObj={userObj} />} />
        <Route path='/chats' element={<Chats />} />
        <Route path='/chatting' element={<Chatting userObj={userObj} />} />
        <Route path='/find' element={<Find />} />
        <Route path='/more' element={<More userObj={userObj} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
