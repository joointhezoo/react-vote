import {combineReducers} from 'redux';
import {createAction, createReducer} from '@reduxjs/toolkit';
import user from 'ducks/user';

export const addPoll = createAction<Poll>('ADD_POLL');
export const updatePoll = createAction<Poll>('UPDATE_POLL');
export const toggleModal = createAction('TOGGLE_MODAL');


export interface Poll {
  id?: string;
  writer?: string;
  status?: string;
  question?: string;
  options: OptionItem[];
}

export interface OptionItem {
  title: string;
  voter: string[];
}

export interface State {
  openModal: boolean;
  poll: Poll[];
}

export const INITIAL_STATE: State = {
  openModal: false,
  poll: [
    {
      id: 'sdfsdf22',
      writer: 'kai7v2ut',
      question: 'Choose Friday night activity',
      options: [
        {title: 'watching Movie', voter: ['alex', 'chris']},
        {title: 'escape room', voter: ['jin']},
        {title: 'Bowling', voter: ['kai7v2ut']}
      ],
      status: 'fulfilled',
    },
    {
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
  ]
};

const poll = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(toggleModal, (state) => {
      state.openModal = !state.openModal;
    })
    .addCase(updatePoll, (state, action) => {
      console.error(action, 'ducks');
      state.poll = [
        ...state.poll,
        action.payload
      ]
    })
});


const rootReducer = combineReducers({poll, user});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;