import React from 'react';

export default ({
  width = 18,
  height = 18,
  fill = '#040404',
}: JSX.IntrinsicElements['svg']) => (
  <svg width={width} height={height} viewBox="0 0 9 9" fill="none">
    <circle cx="4.5" cy="4.5" r="4" stroke={fill} strokeWidth="1"/>
    <path d="M2.5 4C3.7 5.2 4 5.5 4 5.5L6.5 3.5" stroke={fill}/>
  </svg>
);