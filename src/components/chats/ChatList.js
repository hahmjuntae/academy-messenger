import React from 'react';

import dummyData from '../../assets/data/dummy_data.json';

function ChatList({ num, name, text }) {
  return (
    <>
      <span className='chats_img empty'>
        <img src={dummyData[num].img} alt={name} />
      </span>
      <span className='chats_cont'>
        <span className='chats_name'>{name}</span>
        <span className='chats_latest'>{text}</span>
      </span>
      <span className='chats_time'>
        <span>09</span>:<span>41</span>
      </span>
    </>
  );
}

export default ChatList;
