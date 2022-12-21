import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateProfile } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { FaComment, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Header from '../components/common/Header';
import { authService, db, storage } from '../fbase';
import '../styles/profileinfo.scss';

function MyProfileInfo({ userObj }) {
  // console.log(userObj);
  const [editing, setEditing] = useState(true);

  const [userImage, setUserImage] = useState('');
  const [background, setBackground] = useState('');
  const [backgroundImg, setBackgroundImg] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');

  /* onSnapshot을 사용해서 실시간으로 컬렉션에서 데이터 가져오기 */
  useEffect(() => {
    const q = query(collection(db, 'background'), orderBy('createAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      setBackground(newArray);
    });
    setNewDisplayName(userObj.displayName ? `${userObj.displayName}` : 'User');
  }, []);

  /* onSubmitImg */
  const onSubmit = async () => {
    let userImageUrl = '';
    if (userImage !== '') {
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, userImage, 'data_url');
      userImageUrl = await getDownloadURL(ref(storage, response.ref));
      // console.log(response);
    }
    await updateProfile(authService.currentUser, {
      photoURL: userImageUrl,
    });
    setUserImage('');
  };

  /* onUserImgChange */
  /* user이미지 업데이트 */
  const onUserImgChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setUserImage(result);
    };
    reader.readAsDataURL(theFile);
  };

  /* onSubmitBackground */
  const onSubmitBackground = async () => {
    let backgroundImgUrl = '';
    if (backgroundImg !== '') {
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, backgroundImg, 'data_url');
      backgroundImgUrl = await getDownloadURL(ref(storage, response.ref));
      // console.log(response);
    }
    await addDoc(collection(db, 'background'), {
      createAt: Date.now(),
      createId: userObj.uid,
      backgroundImgUrl,
    });
    setBackgroundImg('');
  };

  /* onBackgroundImgChange */
  /* 백그라운드 이미지 업데이트 */
  const onBackgroundImgChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setBackgroundImg(result);
    };
    reader.readAsDataURL(theFile);
  };

  /* onChange */
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  /* onClearUserImage */
  /* 첨부 파일 삭제 */
  const onClearUserImage = () => {
    setUserImage('');
  };
  /* onClearUserImage */
  /* 첨부 파일 삭제 */
  const onClearBackgroundImage = () => {
    setBackgroundImg('');
  };

  /* onEditDisplayName */
  /* 새로운 이름 업데이트 */
  const onEditDisplayName = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
    }
    onEditToggle();
  };

  /* onEditToggle */
  /* Edit 버튼 토글기능 */
  const onEditToggle = () => {
    setEditing((prev) => !prev);
  };

  // console.log(background);
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
      <section className='background'>
        <h2 className='blind'>My profile background image</h2>
        <div
          style={{
            backgroundImage: `url(${
              background[0] &&
              background[0].createId === userObj.uid &&
              background[0].backgroundImgUrl
            })`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100%',
          }}>
          <label htmlFor='changeBackground'>
            <span className='edit'>
              <FontAwesomeIcon icon='fa-solid fa-pencil' />
            </span>
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={onBackgroundImgChange}
            className='blind'
            id='changeBackground'
          />

          {backgroundImg && (
            <>
              <span onClick={onSubmitBackground} className='confirm'>
                OK
              </span>
              <span onClick={onClearBackgroundImage} className='cancel'>
                Cancel
              </span>
              <img src={backgroundImg} className='preview' alt='' />
            </>
          )}
        </div>
      </section>
      <main className='profileInfo'>
        <section className='profile'>
          <h2 className='blind'>My profile info</h2>
          <div className='my_profile_img empty'>
            <img src={userImage ? userImage : userObj.photoURL} className='icon photo' alt='' />
            <label htmlFor='changeUserImg'>
              <span className='edit'>
                <FontAwesomeIcon icon='fa-solid fa-pencil' />
              </span>
            </label>
            <input
              type='file'
              accept='image/*'
              onChange={onUserImgChange}
              className='blind'
              id='changeUserImg'
            />

            {userImage && (
              <>
                <span onClick={onSubmit} className='confirm'>
                  OK
                </span>
                <span onClick={onClearUserImage} className='cancel'>
                  Cancel
                </span>
              </>
            )}
          </div>
          <div className='profile_cont'>
            <span className='profile_name'>
              {editing ? (
                userObj.displayName ? (
                  `${userObj.displayName}`
                ) : (
                  'User'
                )
              ) : (
                <span className='box'>
                  <input
                    type='text'
                    placeholder={userObj.displayName}
                    onChange={onChange}
                    value={newDisplayName}
                    autoFocus
                    className='profile_name_input'
                  />
                  <FontAwesomeIcon
                    onClick={onEditDisplayName}
                    icon='fa-solid fa-check'
                    className='editName-icon check'
                  />
                  <FontAwesomeIcon
                    onClick={onEditToggle}
                    icon='fa-solid fa-xmark'
                    className='editName-icon xmark'
                  />
                </span>
              )}
            </span>
            <span>{userObj.email}</span>
            <ul className='profile_menu'>
              <li>
                <span>
                  <FaComment className='icon' />
                </span>
                <b>My Chatroom</b>
              </li>
              <li>
                <span onClick={onEditToggle}>
                  <FaPencilAlt className='icon' />
                </span>
                <b>Edit Profile</b>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyProfileInfo;
