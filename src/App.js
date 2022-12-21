import { library } from '@fortawesome/fontawesome-svg-core';
import { faFontAwesome, faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import AppRouter from './Router';
import { authService } from './fbase';

library.add(fas, faTwitter, faFontAwesome, faGoogle, faGithub);

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null); // 로그인한 사용자의 정보
  const [checkedWidth, setCheckedWidth] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  let winWidth = window.innerWidth;
  function checkWidthSize() {
    if (winWidth > 576) {
      setCheckedWidth(true);
    } else {
      setCheckedWidth(false);
    }
  }
  useEffect(() => {
    checkWidthSize();
    window.addEventListener('resize', () => {
      winWidth = window.innerWidth;
      checkWidthSize();
    });
  }, [winWidth]);

  return (
    <>
      {checkedWidth ? (
        <WindowCover>
          스크린 사이즈를 줄여주세요.
          <br />
          Please reduce the screen size.
        </WindowCover>
      ) : (
        ''
      )}
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : 'initializing...'}
    </>
  );
}
const WindowCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  font-size: 30px;
  font-weight: 300;
  line-height: 1.5;
  text-align: center;
`;
export default App;
