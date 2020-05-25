import React from 'react';
import cn from 'classnames';
import styled from '@emotion/styled';
import {black2, black3, white1, white2} from 'styles/colors';

interface Props {
  theme?: 'solid' | 'line';
}
const Button = styled.button({
  fontWeight: 700,
  padding: '8px',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  border: `1px solid ${black2}`,
  '&.solid': {
    background: black2,
    color: white1,
  },
  '&.solid:hover': {
    background: black3
  },
  '&.line': {
    background: white1,
    color: black2,
  },
  '&.line:hover': {
    background: white2
  }
});

export default ({
  children,
  theme = 'solid',
  onClick = () => {},
  style,
  type
}: Props & JSX.IntrinsicElements['button']) => {
  return (
    <Button type={type} className={cn(theme)} onClick={onClick} style={style}>
      {children}
    </Button>
  );
};