import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

import { authService } from '../../fbase';

function AuthForm() {
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /* 로그인,계정생성 */
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        // 계정생성 함수
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        // 로그인 함수
        data = await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  /* 이메일, 비밀번호 입력값 받기 */
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  /* 로그인 - 계정생성 토글버튼 이벤트 */
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <>
      <form onSubmit={onSubmit} className='container'>
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          required
          onChange={onChange}
          className='authInput'
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          required
          onChange={onChange}
          className='authInput'
        />
        <input
          type='submit'
          value={newAccount ? 'Create Account' : 'Login'}
          className='authInput authSubmit'
        />
        {error && <span className='authError'>{error}</span>}
      </form>
      <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? 'Login' : 'Create Account'}
      </span>
    </>
  );
}

export default AuthForm;
