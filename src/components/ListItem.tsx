import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {css} from '@emotion/core';
import {Poll} from 'ducks';
import {userNameSelector} from 'selectors';
import Title from 'components/base/Title';
import Chevron from 'components/svg/Chevron';
import WriterEdit from 'components/WriterEdit';
import ListItemDetail from 'components/ListItemDetail';
import {DateYYYYMMDDHHMM} from 'utils';

export default ({id, voted, status, startDate, endDate, question, writer, options}: Poll) => {
  const [open, toggleOpen] = useState(false);
  const name = useSelector(userNameSelector);

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
        <span css={css`letter-spacing: -1.2px; font-size: 12px; text-align: right; margin: 0 8px 0 0;`}>
          {DateYYYYMMDDHHMM(startDate)}<br/>~{DateYYYYMMDDHHMM(endDate)}
        </span>
        <span css={css`
          font-size :12px;
          padding: 4px;
        `}>{writer}</span>
        <Chevron onClick={() => toggleOpen(!open)} fill={'#fff'} pointAt={open ? 'up' : 'down'}/>
      </Title>
    )
  };

  const pollData = {id, voted, status, startDate, endDate, question, writer, options};
  return (
    <div css={css`margin: 16px 0;`}>
      {_renderTitle()}
      {open && (
        <>
          <ListItemDetail {...pollData}/>
          {writer === name && <WriterEdit id={id}/>}
        </>
      )}
    </div>
  );
};