import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { FaAngleLeft, FaBars, FaPlus } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Header from '../components/common/Header';
import NewChat from '../components/chats/NewChat';
import dummyData from '../assets/data/dummy_data.json';
import { db, storage } from '../fbase';
import '../styles/chatting.scss';

function Chatting({ userObj }) {
  const location = useLocation();
  const { id, name, company } = location.state;

  const [chat, setChat] = useState('');
  const [chats, setChats] = useState('');
  const [attachment, setAttachment] = useState('');

  /* onSnapshot을 사용해서 실시간으로 컬렉션에서 데이터 가져오기 */
  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createAt', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      setChats(newArray);
    });
  }, []);

  /* onChange */
  /* 텍스트 입력 시 */
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setChat(value);
  };

  /* onAttach */
  /* 첨부 한 파일 인식 */
  const onAttach = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  /* onClearAttachment */
  /* 첨부파일 초기화 */
  const onClearAttachment = () => {
    setAttachment('');
  };

  /* onSubmit */
  /* Send버튼 클릭 시 */
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      // console.log('attach');
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, 'data_url');
      // console.log(response);

      attachmentUrl = await getDownloadURL(ref(storage, response.ref));
    }

    await addDoc(collection(db, 'chats'), {
      text: chat,
      createAt: Date.now(),
      createId: userObj.uid,
      attachmentUrl,
    });
    setChat('');
    setAttachment('');
  };

  return (
    <div>
      <Header
        className='Chatting'
        heading={name}
        leftItem={
          <Link to='/chats'>
            <FaAngleLeft className='icon' />
          </Link>
        }
        rightItem={
          <>
            <FaBars className='icon' />
          </>
        }
      />
      <main className='Chatting'>
        <span className='date_info'>Monday, October 17, 2022</span>
        {/* my */}
        <div className='chat_box my'>
          <span className='chat'>What is your catchphrase?</span>
          <span className='chat_time'>
            <span>16</span>:<span>30</span>
          </span>
        </div>
        {/* other */}
        <div className='chat_box other'>
          <div className='other_info'>
            <span className='profile_img empty'>
              <img src={dummyData[id - 1].img} alt={name} />
            </span>
            <span className='profile_name'>{name}</span>
          </div>
          <span className='chat'>{company.catchPhrase}!</span>
          <span className='chat_time'>
            <span>17</span>:<span>33</span>
          </span>
        </div>
        {/* new */}
        <div className='chat_box my new'>
          {chats &&
            chats.map((chat) => <NewChat chatObj={chat} isOwner={chat.createId === userObj.uid} />)}
        </div>
      </main>
      <footer>
        {attachment && (
          <div className='attach-preview'>
            <span onClick={onClearAttachment} className='attach-preview-clear'>
              Clear Image
            </span>
            <img className='attach-preview-photo' src={attachment} alt='' />
          </div>
        )}
        <form onSubmit={onSubmit}>
          <fieldset className='text_box'>
            <label htmlFor='attachment' className='plus_btn'>
              <FaPlus className='icon' />
            </label>
            <input
              accept='image/*'
              type='file'
              id='attachment'
              className='blind'
              onChange={onAttach}
            />
            <legend className='blind'>채팅 입력창</legend>
            <label htmlFor='chatting' className='blind'>
              채팅 입력
            </label>
            <input
              autoFocus
              onChange={onChange}
              type='text'
              id='chatting'
              className='text_field'
              maxLength={120}
              value={chat}
            />
            <span className='emoticon_btn'>
              <BsEmojiSmile className='icon' />
            </span>
            <span onClick={onSubmit} className='send_btn'>
              <FiSend className='icon' />
            </span>
          </fieldset>
        </form>
      </footer>
    </div>
  );
}

export default Chatting;
