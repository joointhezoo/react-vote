import {combineReducers} from 'redux';
import {createAction, createReducer} from '@reduxjs/toolkit';
import user from 'ducks/user';

export const addPoll = createAction<Pick<Poll, 'question' | 'options' | 'startDate' | 'endDate'>>('ADD_POLL');
export const modifyPoll = createAction<Pick<Poll, 'question' | 'options' | 'startDate' | 'endDate' | 'id'>>('MODIFY_POLL');
export const deletePoll = createAction<string>('DELETE_POLL');
export const updatePoll = createAction<{[key: string]: Poll}>('UPDATE_POLL');
export const toggleModal = createAction('TOGGLE_MODAL');
export const selectOption = createAction<SelectOption>('SELECT_OPTION');
export const selectPoll = createAction<string | null>('SELECT_POLL');
export const votePoll = createAction<string>('VOTE_POLL');

interface SelectOption {
  id: string;
  index: number;
}

export interface Poll {
  id: string;
  startDate: number;
  endDate: number;
  writer: string;
  question: string;
  options: OptionItem[];
  voted: boolean;
}

export interface OptionItem {
  title: string;
  voter: string[];
}

export interface State {
  openModal: boolean;
  selectedPoll: null | string;
  poll: {
    [key: string]: Poll;
  };
}

export const INITIAL_STATE: State = {
  openModal: false,
  selectedPoll: null,
  poll: {
    'sdfsdf22': {
      id: 'sdfsdf22',
      writer: 'kai7v2ut',
      question: 'Choose Friday night activity',
      startDate: 1590332400000,
      endDate: 1590505200000,
      options: [
        {title: 'watching Movie', voter: ['alex', 'chris']},
        {title: 'escape room', voter: ['jin']},
        {title: 'Bowling', voter: ['kai7v2ut']},
      ],
      voted: false
    },
    'asd123a':  {
      id: 'asd123a',
      writer: 'sdlf23sd',
      startDate: 0,
      endDate: 0,
      question: 'what do you want to eat for lunch?',
      options: [
        {title: 'pizza', voter: ['alex', 'chris', 'kai7v2ut']},
        {title: 'hamburger', voter: ['jin']},
        {title: 'salad', voter: []}
      ],
      voted: true
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
    .addCase(selectPoll, (state, action) => {
      state.selectedPoll = action.payload
    })
    .addCase(votePoll, (state, action) => {
      console.error(action.payload);
      state.poll = {
        ...state.poll,
        [action.payload]: {
          ...state.poll[action.payload],
          voted: true
        }
      }
    })
});


const rootReducer = combineReducers({poll, user});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;