import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Header from '../components/common/Header';
import MyProfile from '../components/common/MyProfile';
import SearchBox from '../components/common/SearchBox';
import TabBar from '../components/common/TabBar';
import FriendsProfile from '../routes/FriendsProfile';
import '../styles/friends.scss';

function Friends({ userObj }) {
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);

  const getProfiles = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');

    setIsLoading(false);
    setProfiles(data);
  };
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='loader'>
          <span className='loader_text'>Loading...</span>
        </div>
      ) : (
        <>
          <Header
            className={'friends'}
            heading={'Friends'}
            leftItem={'Manage'}
            rightItem={<FaCog className='icon' />}
          />
          <SearchBox />
          <main>
            <section className='main_section'>
              <MyProfile userObj={userObj} />
            </section>
            <section className='main_section'>
              <div className='header-friends'>
                <h2>Friends</h2>
              </div>
              <ul>
                {profiles.map((profile, idx) => (
                  <li key={profile.id}>
                    <Link to={'/friendsprofileinfo'} state={profile}>
                      <FriendsProfile
                        userObj={userObj}
                        num={idx}
                        name={profile.name}
                        email={profile.company.catchPhrase}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </main>
          <TabBar />
        </>
      )}
    </>
  );
}

export default Friends;
