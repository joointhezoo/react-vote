import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import {Poll, deletePoll} from 'ducks';
import {userNameSelector} from 'selectors';
import Title from 'components/base/Title';
import Button from 'components/base/Button';
import CheckFilled from 'components/svg/CheckFilled';
import CheckEmpty from 'components/svg/CheckEmpty';
import Chevron from 'components/svg/Chevron';

const Item = styled.li({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px',
  borderTop: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
  '&.ended': {
    cursor: 'not-allowed'
  },
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
  const dispatch = useDispatch();
  const [open, toggleOpen] = useState(false);
  const name = useSelector(userNameSelector);
  const isEnd = status === 'ended';

  const _handleDelete = useCallback(id => dispatch(deletePoll(id)), [dispatch]);
  return (
    <div css={css`
      margin: 16px 0;
    `}>
      <Title>
         <span css={css`
          width: 56px;
          text-align: center;
          font-size: 12px;
          border: 2px solid #fff;
          border-radius: 4px;
          padding: 4px;
          margin: 0 8px 0 0;
        `}>{status}</span>
        <div css={css`flex: 1;`}>
          {question}
        </div>
        <span css={css`
          font-size :12px;
          padding: 4px;
        `}>{writer}</span>
        <Chevron onClick={() => toggleOpen(!open)} fill={'#fff'} pointAt={open ? 'up' : 'down'}/>
      </Title>
      {open && (
        <ul>
          {options.map(({title, voter}, index) => {
            const selected = voter.includes(name);
            const voteNum = voter.length;
            return (
              <Item className={cn(status)} key={`${id}-${index}`} onClick={() => {}}>
                {selected ? <CheckFilled/> : <CheckEmpty/>}
                <p>{title}</p>
                {isEnd && voteNum > 0 && <span><span role="img" aria-label="hand">🖐🏻</span>{voteNum}&nbsp;</span>}
              </Item>
            )
          })}
          {writer === name && (
            <div>
              <Button theme="line">Modify</Button>
              <Button theme="line" onClick={() => _handleDelete(id)}>Delete</Button>
            </div>
          )}
        </ul>
      )}
    </div>
  );
};