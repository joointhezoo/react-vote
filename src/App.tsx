import React, {useCallback} from 'react';
import {css} from '@emotion/core';
import List from 'components/List';
import Button from 'components/base/Button';
import Header from 'components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {modalSelector} from 'selectors';
import Poll from 'components/Poll';
import {selectPoll, toggleModal} from 'ducks';

export default () => {
  const dispatch = useDispatch();
  const openModal = useSelector(modalSelector);
  const _handleCloseModal = useCallback(() => {
    dispatch(selectPoll(null));
    dispatch(toggleModal());
  }, [dispatch]);
  return (
    <div css={css`
      max-width: 720px;
      width: 100%;
      margin: 16px auto;
      padding: 24px;
      background: #eee;
    `}>
      <Header/>
      <Button onClick={() => _handleCloseModal()}>Create</Button>
      {openModal && <Poll onClose={_handleCloseModal}/>}
      <List/>
    </div>
  );
}
