import React, {ReactNode} from 'react';
import cn from 'classnames';
import {css} from '@emotion/core';

interface Props {
  children?: ReactNode;
  background?: string;
  zIndex?: number;
  transition?: boolean;
  onClick?: () => void;
}
export default ({
  children,
  background = 'rgba(4, 4, 4, 0.5)',
  zIndex = 5000,
  transition = false,
  onClick = () => {}
}: Props) => {
  return (
    <div className={cn('dim-layer', {transition})} css={css`
      position: fixed;
        top: 0;
        left: 0;
        z-index: ${zIndex};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: ${background};
        & .transition: {
          animation: 0.3s ease 0s 1 forwards dissolve;
        }
    `}onClick={onClick}>
      <div className={cn('dim-content', {transition})}>
        {children}
      </div>
    </div>
  );
};