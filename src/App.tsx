import React, {useCallback} from 'react';
import {css} from '@emotion/core';
import List from 'components/List';
import Button from 'components/base/Button';
import Header from 'components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {modalSelector} from 'selectors';
import Poll from 'components/Poll';
import {toggleModal} from 'ducks';

export default () => {
  const dispatch = useDispatch();
  const openModal = useSelector(modalSelector);
  const _toggleModal = useCallback(() => {
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
      <Button onClick={() => _toggleModal()}>Create</Button>
      {openModal && <Poll onClose={_toggleModal}/>}
      <List/>
    </div>
  );
}
