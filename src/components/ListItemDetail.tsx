import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import {Poll, selectOption, OptionItem, votePoll} from 'ducks';
import {userNameSelector} from 'selectors';
import Button from 'components/base/Button';
import {getStatus} from 'utils';

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

export default ({id, voted, startDate, endDate, options}: Poll) => {
  const dispatch = useDispatch();
  const status = getStatus(startDate, endDate);
  const name = useSelector(userNameSelector);
  const isEnd = status === 'ended' || voted;
  const canVoted = status === 'ongoing' && !voted;

  const _handleCheck = (index: number) => {
    if (status === 'ongoing' && !voted) {
      dispatch(selectOption({id, index}))
    }
  };
  return (
    <ul>
      {options.map(({title, voter}: OptionItem, index) => {
        const selected = voter.includes(name);
        const voteNum = voter.length;
        return (
          <Item className={cn(status)} key={`${id}-${index}`} onClick={() => _handleCheck(index)}>
            <input type="radio" value={title} checked={selected}/>
            <p css={css`flex:1; text-align: left;`}>{title}</p>
            {isEnd && voteNum > 0 && <span><span role="img" aria-label="hand">🖐🏻</span>{voteNum}&nbsp;</span>}
          </Item>
        )
      })}
      {canVoted && <Button
        onClick={() => dispatch(votePoll(id))}
        style={{width: '100%'}}>Vote</Button>}
    </ul>
  );
};