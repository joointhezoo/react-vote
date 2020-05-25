import React from 'react';
import styled from '@emotion/styled';
import {white1, blue1} from 'styles/colors';

const Title = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '60px',
  padding: '0 24px',
  color: white1,
  background: blue1,
  fontWeight: 700
});

export default ({children}: JSX.IntrinsicElements['div']) => {
  return (
    <Title>{children}</Title>
  );
};