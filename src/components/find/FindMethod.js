import React from 'react';
import { FaAddressBook, FaEnvelope, FaMobileAlt, FaQrcode } from 'react-icons/fa';

function FindMethod() {
  return (
    <ul className='find_method'>
      <li>
        <span>
          <FaAddressBook className='find_method_icon' />
          Find
        </span>
      </li>
      <li>
        <span>
          <FaQrcode className='find_method_icon' />
          QR Code
        </span>
      </li>
      <li>
        <span>
          {' '}
          <FaMobileAlt className='find_method_icon' />
          Shake
        </span>
      </li>
      <li>
        <span>
          <FaEnvelope className='find_method_icon' />
          Invite
        </span>
      </li>
    </ul>
  );
}

export default FindMethod;
