import React from 'react';
import { MdSearch } from 'react-icons/md';

function SearchBox() {
  return (
    <form action='/' className='search-box'>
      <fieldset className='serach_inner'>
        <legend className='blind'>검색창</legend>
        <MdSearch className='search_icon' />
        <input
          type='search'
          name='search'
          id='serach'
          placeholder='Find Friends, Chats, Plus Friends'
        />
      </fieldset>
    </form>
  );
}

export default SearchBox;
