import React from 'react';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../fbase';

function UserInfo({ userObj }) {
  const navigate = useNavigate();

  /* onLogOutClick */
  /* 로그아웃 클릭 시 로그아웃 후 홈으로 다이렉트 */
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
    window.location.reload();
  };
  return (
    <section className='user_info'>
      <h2 className='blind'>사용자 정보</h2>
      <span className='profile_img empty'>
        <img src={userObj.photoURL} className='user' alt='' />
      </span>
      <span className='profile_info'>
        <span className='profile_name'>
          {userObj.displayName ? `${userObj.displayName}` : 'User'}
        </span>
        <span className='profile_email'>{userObj.email}</span>
      </span>
      <span onClick={onLogOutClick} className='logout'>
        Logout
      </span>
    </section>
  );
}

export default UserInfo;
