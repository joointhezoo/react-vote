import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import {Poll, deletePoll, selectOption, selectPoll, toggleModal, OptionItem} from 'ducks';
import {userNameSelector} from 'selectors';
import Title from 'components/base/Title';
import Button from 'components/base/Button';
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

  const _handleModify = useCallback(id => {
    dispatch(selectPoll(id));
    dispatch(toggleModal());
  }, [dispatch]);

  const _handleDelete = useCallback(id => dispatch(deletePoll(id)), [dispatch]);

  const _renderTitle = () => {
    return (
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
    )
  };

  const _handleCheck = (index: number) => {
    dispatch(selectOption({id, index}))
  };

  const _renderDetail = () => {
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
      </ul>
    )
  };

  const _renderEditor = () => {
    return (
      <div>
        <Button theme="line" onClick={() => _handleModify(id)}>Modify</Button>
        <Button theme="line" onClick={() => _handleDelete(id)}>Delete</Button>
      </div>
    )
  };

  return (
    <div css={css`margin: 16px 0;`}>
      {_renderTitle()}
      {open && _renderDetail()}
      {open && writer === name && _renderEditor()}
    </div>
  );
};