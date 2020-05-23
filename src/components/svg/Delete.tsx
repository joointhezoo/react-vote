import React from 'react';

export default ({
  width = 16,
  height = 16,
  fill = '#040404',
  onClick = () => {}
}: JSX.IntrinsicElements['svg']) => (
  <svg width={width} height={height}  viewBox="0 0 18 18" fill="none" onClick={onClick}>
    <circle cx="9" cy="9" r="8" stroke={fill} strokeWidth="2"/>
    <path d="M3 9H15" stroke={fill} strokeWidth="2"/>
  </svg>
);