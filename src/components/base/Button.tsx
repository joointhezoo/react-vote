import React from 'react';
import cn from 'classnames';
import styled from '@emotion/styled';

interface Props {
  theme?: 'solid' | 'line';
}
const Button = styled.button({
  fontWeight: 700,
  padding: '8px',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  '&.solid': {
    border: '1px solid #333',
    background: '#333',
    color: '#fff',
  },
  '&.solid:hover': {
    background: '#666'
  },
  '&.line': {
    border: '1px solid #333',
    background: '#fff',
    color: '#333',
  }
});

export default ({
  children,
  disabled,
  theme = 'solid',
  onClick = () => {},
  style,
  type
}: Props & JSX.IntrinsicElements['button']) => {
  return (
    <Button type={type} className={cn(theme)} disabled={disabled} onClick={onClick} style={style}>
      {children}
    </Button>
  );
};