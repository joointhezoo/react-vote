import React from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import Title from 'components/base/Title';
import Button from 'components/base/Button';
import CheckFilled from 'components/svg/CheckFilled';
import CheckEmpty from 'components/svg/CheckEmpty';
import {userNameSelector} from 'selectors';
import {useSelector} from 'react-redux';
import {Poll} from 'ducks';

const Item = styled.li({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  borderTop: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
  '& p': {
    textAlign: 'left',
    flex: 1
  },
  '& svg': {
    margin: '0 8px 0 0'
  },
  '& span': {
    color: '#444',
    justifyContent: 'flex-end',
    margin: '0 8px 0 0',
    textAlign: 'right'
  }
});

export default ({id, status, question, writer, options}: Poll) => {
  const name = useSelector(userNameSelector);
  const isEnd = status === 'ended';

  return (
    <div css={css`
      margin: 16px 0;
    `}>
      <Title>
        <div>
          {isEnd && (
            <>
              <span role="img" aria-label="stop">🚫</span> Result:&nbsp;
            </>
          )}
          {question}
        </div>
        {writer === name && <Button theme="line">Modify</Button>}
      </Title>
      <ul>
        {options.map(({title, voter}, index) => {
          const selected = voter.includes(name);
          return (
            <Item key={`${id}-${index}`} onClick={() => {}}>
              {selected ? <CheckFilled/> : <CheckEmpty/>}
              <p>{title}</p>
              {isEnd && voter.length > 0 && <span><span role="img" aria-label="hand">🖐🏻</span>{voter.join(',')}</span>}
            </Item>
          )
        })}
      </ul>
    </div>
  );
};