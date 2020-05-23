import React from 'react';

export default ({
  width = 18,
  height = 18,
  fill = '#040404',
}: JSX.IntrinsicElements['svg']) => (
  <svg width={width} height={height}  viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8.5" stroke={fill}/>
  </svg>
);