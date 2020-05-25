import React, {ReactNode} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import Close from 'components/svg/Close';
import DimLayer from 'components/base/DimLayer';
import {black2, white1} from 'styles/colors';

interface Props {
  children?: ReactNode;
  onClose?: () => void;
}

const CloseBtn = styled.div({
  position: 'absolute',
  top: '36px',
  right: '36px',
  cursor: 'pointer'
});

export default ({
  children,
  onClose = () => {}
}: Props) => {

  return (
    <>
      <div css={css`
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 105;
        max-width: 540px;
        width: 100%;
        height: auto;
        padding: 40px;
        border-radius: 4px;
        background: ${white1};
        transform: translate(-50%, -50%);
      `}>
        <CloseBtn onClick={() => onClose()}>
          <Close fill={black2}/>
        </CloseBtn>
        {children}
      </div>
      <DimLayer/>
    </>
  );
};