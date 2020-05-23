import React from 'react';

/* eslint max-len: 0 */
export default ({
  width = 24,
  height = 24,
  fill = '#040404'
}: JSX.IntrinsicElements['svg']) => (
  <svg width={width} height={height} viewBox="0 0 32 32" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M25.1924 8.22183L23.7782 6.80762L16 14.5858L8.22183 6.8077L6.80762 8.22191L14.5858 16.0001L6.80764 23.7782L8.22186 25.1924L16 17.4143L23.7782 25.1925L25.1924 23.7783L17.4142 16.0001L25.1924 8.22183Z" fill={fill}/>
  </svg>
);