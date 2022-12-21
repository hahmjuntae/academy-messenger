import React from 'react';

function Header({ heading, leftItem, rightItem, className }) {
  return (
    <header className={className}>
      <div className='title_bar'>
        <h1>{heading}</h1>
        <div className='left_item'>{leftItem}</div>
        <div className='right_item'>{rightItem}</div>
      </div>
    </header>
  );
}

export default Header;
