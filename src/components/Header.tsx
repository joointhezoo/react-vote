import React from 'react';
import {useSelector} from 'react-redux';
import {css} from '@emotion/core';
import {userNameSelector} from 'selectors';

export default () => {
  const name = useSelector(userNameSelector);

  return (
    <div css={css`
      display: flex; 
      justify-content: space-between;
    `}>
      <p css={css`
        font-size: 24px; 
        font-weight: 700;
      `}>React Vote</p>
      <div>Username: <span>{name}</span></div>
    </div>
  );
};