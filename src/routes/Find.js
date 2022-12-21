import FindMethod from '../components/find/FindMethod';
import Header from '../components/common/Header';
import RecommendSection from '../components/find/RecommendSection';
import TabBar from '../components/common/TabBar';
import '../styles/find.scss';

function Find() {
  return (
    <>
      <Header className={'find'} heading={'Find'} leftItem={'Edit'} rightItem={''} />
      <FindMethod className='find_method' />
      <RecommendSection className='recommend_Section' />
      <TabBar />
    </>
  );
}

export default Find;
