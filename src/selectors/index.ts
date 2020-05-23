import {createSelector} from '@reduxjs/toolkit';
import {RootState} from 'ducks';

export const userNameSelector = createSelector((state: RootState) => state.user.userName, d => d);

export const pollListSelector = createSelector((state: RootState) => state.poll.poll, d => d);
export const modalSelector = createSelector((state: RootState) => state.poll.openModal, d => d);

