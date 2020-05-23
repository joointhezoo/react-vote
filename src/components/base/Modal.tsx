import React, {ReactNode} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import Close from 'components/svg/Close';
import {white1} from 'styles/colors';
import DimLayer from 'components/base/DimLayer';

interface Props {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
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
  width = 520,
  height,
  zIndex = 5100,
  onClose = () => {}
}: Props) => {

  return (
    <>
      <div css={css`
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: ${zIndex};
        width: 100%;
        height: auto;
        padding: 40px;
        border-radius: 4px;
        background: ${white1};
        transform: translate(-50%, -50%);
      `} style={{maxWidth: width, maxHeight: height}}>
        <CloseBtn onClick={() => onClose()}>
          <Close fill={"#333"}/>
        </CloseBtn>
        {children}
      </div>
      <DimLayer/>
    </>
  );
};