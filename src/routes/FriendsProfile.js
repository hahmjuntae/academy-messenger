import React from 'react';

import dummyData from '../assets/data/dummy_data.json';

function FriendsProfile({ name, email, num }) {
  return (
    <div>
      <span className='profile_img empty'>
        <img src={dummyData[num].img} alt={name} />
      </span>
      <span className='profile_name'>{name}</span>
      <span className='profile_messages'>{email}</span>
    </div>
  );
}

export default FriendsProfile;
