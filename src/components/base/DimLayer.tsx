import React from 'react';
import cn from 'classnames';
import {css} from '@emotion/core';

interface Props {
  onClick?: () => void;
}
export default ({
  onClick = () => {}
}: Props) => {
  return (
    <div
      className={cn('dim-layer')}
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: rgba(4, 4, 4, 0.5);
      `}
      onClick={onClick}/>
  );
};