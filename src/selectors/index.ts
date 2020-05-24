import {createSelector} from '@reduxjs/toolkit';
import values from 'lodash/fp/values';
import {RootState} from 'ducks';

export const userNameSelector = createSelector((state: RootState) => state.user.userName, d => d);
export const modalSelector = createSelector((state: RootState) => state.poll.openModal, d => d);
export const pollSelector = createSelector((state: RootState) => state.poll.poll, d => d);
export const pollListSelector = createSelector((state: RootState) => state.poll.poll, d => values(d));
export const selectedPollIdSelector = createSelector((state: RootState) => state.poll.selectedPoll, d => d);

export const selectedPollSelector = createSelector(
  selectedPollIdSelector,
  pollSelector,
  (selectedId, poll) => {
    return selectedId ? poll[selectedId] : null;
  }
);

