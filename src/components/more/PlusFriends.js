import React from 'react';
import {
  FaGraduationCap,
  FaHome,
  FaInfoCircle,
  FaPencilAlt,
  FaTv,
  FaUniversity,
  FaUtensils,
  FaVideo,
  FaWonSign,
} from 'react-icons/fa';

function PlusFriends() {
  return (
    <section className='plus_friends'>
      <div className='more-heading'>
        <h2>Plus Friends</h2>
        <span>
          <FaInfoCircle className='header_icon' /> Learn more
        </span>
      </div>
      <ul className='plus_list'>
        <li>
          <FaUtensils className='icon' />
          Order
        </li>
        <li>
          <FaHome className='icon' />
          Store
        </li>
        <li>
          <FaTv className='icon' />
          TV Channel/Radio
        </li>
        <li>
          <FaPencilAlt className='icon' />
          Creation
        </li>
        <li>
          <FaGraduationCap className='icon' />
          Education
        </li>
        <li>
          <FaUniversity className='icon' />
          Politics/Societv
        </li>
        <li>
          <FaWonSign className='icon' />
          Finance
        </li>
        <li>
          <FaVideo className='icon' />
          Movies/Music
        </li>
      </ul>
    </section>
  );
}

export default PlusFriends;
