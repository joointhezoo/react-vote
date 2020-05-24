import {combineReducers} from 'redux';
import {createAction, createReducer} from '@reduxjs/toolkit';
import user from 'ducks/user';

export const addPoll = createAction<Pick<Poll, 'question' | 'options' | 'startDate' | 'endDate'>>('ADD_POLL');
export const deletePoll = createAction<string>('DELETE_POLL');
export const updatePoll = createAction<{[key: string]: Poll}>('UPDATE_POLL');
export const toggleModal = createAction('TOGGLE_MODAL');
export const selectOption = createAction<SelectOption>('SELECT_OPTION');

interface SelectOption {
  id: string;
  index: number;
}

export interface Poll {
  id: string;
  startDate?: string;
  endDate?: string;
  writer: string;
  status: 'pending' | 'ongoing' | 'ended';
  question: string;
  options: OptionItem[];
}

export interface OptionItem {
  title: string;
  voter: string[];
}

export interface State {
  openModal: boolean;
  poll: {
    [key: string]: Poll;
  };
}

export const INITIAL_STATE: State = {
  openModal: false,
  poll: {
    'sdfsdf22': {
      id: 'sdfsdf22',
      writer: 'kai7v2ut',
      question: 'Choose Friday night activity',
      options: [
        {title: 'watching Movie', voter: ['alex', 'chris']},
        {title: 'escape room', voter: ['jin']},
        {title: 'Bowling', voter: ['kai7v2ut']}
      ],
      status: 'ongoing',
    },
    'asd123a':  {
      id: 'asd123a',
      writer: 'sdlf23sd',
      question: 'what do you want to eat for lunch?',
      options: [
        {title: 'pizza', voter: ['alex', 'chris', 'kai7v2ut']},
        {title: 'hamburger', voter: ['jin']},
        {title: 'salad', voter: []}
      ],
      status: 'ended',
    }
  }
};

const poll = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(toggleModal, (state) => {
      state.openModal = !state.openModal;
    })
    .addCase(updatePoll, (state, action) => {
      state.poll = action.payload
    })
});


const rootReducer = combineReducers({poll, user});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;