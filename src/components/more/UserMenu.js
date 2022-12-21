import React from 'react';
import { FaHandPeace, FaPalette, FaSmile, FaUserCircle } from 'react-icons/fa';

function UserMenu() {
  return (
    <section className='user_menu'>
      <h2 className='blind'>사용자 메뉴</h2>
      <ul>
        <li>
          <span>
            <FaSmile className='icon' />
            Emoji
          </span>
        </li>
        <li>
          <span>
            <FaPalette className='icon' />
            Themes
          </span>
        </li>
        <li>
          <span>
            <FaHandPeace className='icon' />
            Plus Friends
          </span>
        </li>
        <li>
          <span>
            <FaUserCircle className='icon' />
            Account
          </span>
        </li>
      </ul>
    </section>
  );
}

export default UserMenu;
