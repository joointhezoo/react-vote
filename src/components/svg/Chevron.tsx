import React from 'react';

type PointAt = 'down' | 'up';

interface Props {
  pointAt?: PointAt;
  onClick?: () => void;
}

/* eslint max-len: 0 */
const d = (pointAt: PointAt) => {
  switch (pointAt) {
    case 'up': return 'M16 12L8.92896 19.0711L10.3432 20.4853L16 14.8284L21.6569 20.4853L23.0711 19.0711L16 12Z';
    case 'down': return 'M16 20.2426L8.92896 13.1715L10.3432 11.7573L16 17.4142L21.6569 11.7573L23.0711 13.1715L16 20.2426Z';
  }
};

export default ({
  width = 32,
  height = 32,
  fill = '#040404',
  pointAt = 'down',
  onClick = () => {}
}: Props & JSX.IntrinsicElements['svg']) => {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" onClick={onClick}>
      <path d={d(pointAt)} fill={fill}/>
    </svg>
  );
}