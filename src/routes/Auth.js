import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

import AuthForm from '../components/auth/AuthForm';
import { authService } from '../fbase';
import '../styles/auth.scss';

function Auth() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null); // 로그인한 사용자의 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  /* onSocialClick */
  /* 소셜버튼 클릭 */
  const onSocialClick = (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }
    const data = signInWithPopup(authService, provider);
  };

  return (
    <div className='auth'>
      <div className='logo'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-brand-wechat'
          viewBox='0 0 24 24'
          strokeWidth='1'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M16.5 10c3.038 0 5.5 2.015 5.5 4.5c0 1.397 -.778 2.645 -1.999 3.47l-.001 2.03l-1.964 -1.178a6.649 6.649 0 0 1 -1.536 .178c-3.038 0 -5.5 -2.015 -5.5 -4.5s2.462 -4.5 5.5 -4.5z'></path>
          <path d='M11.197 15.698c-.69 .196 -1.43 .302 -2.197 .302a8.008 8.008 0 0 1 -2.612 -.432l-2.388 1.432v-2.801c-1.237 -1.082 -2 -2.564 -2 -4.199c0 -3.314 3.134 -6 7 -6c3.782 0 6.863 2.57 6.996 5.785l.004 .233'></path>
          <path d='M10 8h.01'></path>
          <path d='M7 8h.01'></path>
          <path d='M15 14h.01'></path>
          <path d='M18 14h.01'></path>
        </svg>
      </div>
      <AuthForm />
      <div className='authContainer'>
        <div className='authBtns'>
          <button onClick={onSocialClick} name='google' className='authBtn'>
            <FcGoogle className='google-icon' /> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
