import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Poll, deletePoll, selectPoll, toggleModal} from 'ducks';
import Button from 'components/base/Button';

export default ({id}: Pick<Poll, 'id'>) => {
  const dispatch = useDispatch();

  const _handleModify = useCallback(id => {
    dispatch(selectPoll(id));
    dispatch(toggleModal());
  }, [dispatch]);

  const _handleDelete = useCallback(id => dispatch(deletePoll(id)), [dispatch]);

  return (
    <>
      <Button theme="line" onClick={() => _handleModify(id)}>Modify</Button>
      <Button theme="line" onClick={() => _handleDelete(id)}>Delete</Button>
    </>
  );
};