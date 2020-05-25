import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import styled from '@emotion/styled';
import {Poll, selectOption, OptionItem, votePoll} from 'ducks';
import {userNameSelector} from 'selectors';
import Button from 'components/base/Button';
import {getStatus} from 'utils';

const Item = styled.div({
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
    flex: 1,
    margin: '0 0 0 8px',
    textAlign: 'left'
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

  const _handleCheck = useCallback((id, index: number) => {
    if (canVoted) dispatch(selectOption({id, index}))
  }, [dispatch, canVoted]);

  const _renderButton = () => (
    <Button
      onClick={() => dispatch(votePoll(id))}
      style={{width: '100%'}}>Vote</Button>
  );

  return (
    <>
      {options.map(({title, voter}: OptionItem, index) => {
        const selected = voter.includes(name);
        const voteNum = voter.length;
        return (
          <Item className={cn(status)} key={`${id}-${index}`}>
            <input type="radio" value={title} onChange={() => _handleCheck(id, index)} checked={selected}/>
            <p>{title}</p>
            {isEnd && voteNum > 0 && <span><span role="img" aria-label="hand">🖐🏻</span>{voteNum}&nbsp;</span>}
          </Item>
        )
      })}
      {canVoted && _renderButton()}
    </>
  );
};