import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import ChatList from '../components/chats/ChatList';
import FloatingBtn from '../components/chats/FloatingBtn';
import Header from '../components/common/Header';
import SearchBox from '../components/common/SearchBox';
import TabBar from '../components/common/TabBar';
import '../styles/chats.scss';

function Chats() {
  const [profiles, setProfiles] = useState([]);

  const getProfiles = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');

    setProfiles(data);
  };
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <>
      <Header
        className={'chats'}
        heading={'Chats'}
        leftItem={'Edit'}
        rightItem={<BsPlusLg className='icon' />}
      />
      <SearchBox />
      <main>
        <section className='chats_section'>
          <header className='blind'>
            <h2>Chats</h2>
          </header>
          <ul>
            {profiles.map((profile, idx) => (
              <li key={profile.id}>
                <Link to='/chatting' state={profile}>
                  <ChatList num={idx} name={profile.name} text={profile.company.catchPhrase} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <FloatingBtn className='chat_fa_btn' />
      <TabBar />
    </>
  );
}

export default Chats;
