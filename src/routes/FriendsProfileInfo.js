import React from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { FaComment } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import Header from '../components/common/Header';
import dummyData from '../assets/data/dummy_data.json';

function FriendsProfileInfo() {
  const location = useLocation();
  // console.log(location);
  const { id, name, email } = location.state;

  return (
    <div className='MyProfile'>
      <Header
        className={'myProfile'}
        leftItem={
          <Link to='/'>
            <BsArrowLeftCircle className='icon' />
          </Link>
        }
      />
      <div className='background'>
        <h2 className='blind'>My profile background image</h2>
        <div
          style={{
            backgroundImage: `url(${dummyData[id - 1].background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100%',
          }}></div>
      </div>
      <main className='profileInfo'>
        <section className='profile'>
          <h2 className='blind'>My profile info</h2>
          <div className='my_profile_img empty'>
            <img src={dummyData[id - 1].img} alt={name} />
          </div>
          <div className='profile_cont'>
            <span className='profile_name'>{name}</span>
            <span>{email}</span>
            <ul className='profile_menu'>
              <li>
                <span>
                  <FaComment className='icon' />
                </span>
                <b>Chat</b>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FriendsProfileInfo;
