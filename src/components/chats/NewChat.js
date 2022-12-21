import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';

import { db, storage } from '../../fbase';

function NewChat({ chatObj, isOwner }) {
  const [nowDate, setNowDate] = useState(chatObj.createAt);

  useEffect(() => {
    let timeStamp = chatObj.createAt;
    const now = new Date(timeStamp);

    setNowDate(now.toTimeString().split('').splice(0, 5));
  }, []);

  /* onDeleteClick */
  /* 컬렉션에서 데이터 삭제 */
  const onDeleteClick = async () => {
    const ok = window.confirm('삭제하시겠습니까?');
    if (ok) {
      const data = await deleteDoc(doc(db, 'chats', `/${chatObj.id}`));
      if (chatObj.attachmentUrl !== '') {
        const deleteRef = ref(storage, chatObj.attachmentUrl);

        await deleteObject(deleteRef);
      }
    }
  };

  return (
    <>
      {chatObj.attachmentUrl && (
        <div className='attach-wrap'>
          <img className='attach-photo' src={chatObj.attachmentUrl} alt='' />
          <span className='newchat_time'>
            {isOwner && (
              <FontAwesomeIcon className='icon' onClick={onDeleteClick} icon='fa-solid fa-trash' />
            )}
            {nowDate}
          </span>
        </div>
      )}
      {(chatObj.text || chatObj.attachmentUrl) && (
        <>
          {chatObj.text && (
            <span className='chat'>
              <span className='newchat_time'>
                {isOwner && (
                  <FontAwesomeIcon
                    className='icon'
                    onClick={onDeleteClick}
                    icon='fa-solid fa-trash'
                  />
                )}
                {nowDate}
              </span>
              {chatObj.text}
            </span>
          )}
        </>
      )}
    </>
  );
}

export default NewChat;
