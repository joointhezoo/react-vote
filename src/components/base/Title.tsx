import React from 'react';
import styled from '@emotion/styled';
import {white1, blue1} from 'styles/colors';

const Title = styled.div({
  color: white1,
  background: blue1,
  height: '60px',
  padding: '0 24px',
  fontWeight: 700,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export default ({children}: JSX.IntrinsicElements['div']) => {
  return (
    <Title>{children}</Title>
  );
};