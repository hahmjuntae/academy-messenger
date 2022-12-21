import { FaCog } from 'react-icons/fa';

import Header from '../components/common/Header';
import PlusFriends from '../components/more/PlusFriends';
import TabBar from '../components/common/TabBar';
import UserInfo from '../components/more/UserInfo';
import UserMenu from '../components/more/UserMenu';
import '../styles/more.scss';

function More({ userObj }) {
  return (
    <main className='more'>
      <Header className={'more'} heading={'More'} rightItem={<FaCog className='icon' />} />
      <UserInfo userObj={userObj} />
      <UserMenu />
      <PlusFriends />
      <TabBar />
    </main>
  );
}

export default More;
