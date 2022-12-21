import React from 'react';
import { Link } from 'react-router-dom';

function MyProfile({ userObj }) {
  // console.log(userObj);
  return (
    <>
      <div className='header-friends'>
        <h2>My Profile</h2>
      </div>
      <ul>
        <li>
          <Link to='/myprofileinfo'>
            <div>
              <span className='profile_img empty'>
                <img src={userObj.photoURL} className='icon photo' alt='' />
              </span>
              {userObj.displayName ? `${userObj.displayName}` : 'User'}
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default MyProfile;
