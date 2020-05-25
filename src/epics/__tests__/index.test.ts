import {createEpicMiddleware, Epic} from 'redux-observable';
import {createStore, applyMiddleware, Action, Middleware} from 'redux';
import rootReducer, {
  State, Poll, RootState, addPoll, deletePoll, toggleModal, updatePoll, selectOption, OptionItem, modifyPoll
} from 'ducks';
import {addPollList$$, deletePollList$$, selectOption$$, modifyPoll$$} from 'epics';

const createMockStore = (epic: Epic) => {
  const epicMiddleware = createEpicMiddleware();

  const states: RootState[] = [];
  const actions: Action[] = [];
  const actionListeners: ((action: Action) => void)[] = [];

  const mockMiddleware: Middleware = _ => next => action => {
    actions.push(action);
    const result = next(action);
    setTimeout(() => {
      actionListeners.forEach(listener => listener(action));
    });
    return result;
  };

  const store = createStore(
    rootReducer,
    applyMiddleware(
      epicMiddleware,
      mockMiddleware,
    ),
  );

  epicMiddleware.run(epic);

  store.subscribe(() => states.push(store.getState() as RootState));

  return {
    dispatch(action: Action) {
      return store.dispatch(action);
    },
    getState() {
      return store.getState();
    },
    waitForAction(actionMatcher: (action: Action) => boolean) {
      return new Promise(resolve => {
        actionListeners.push((action: Action) => {
          if (actionMatcher(action)) resolve();
        });
      });
    }
  };
};

describe('addPollList$$', () => {
  it ('success', async () => {
    const store = createMockStore(addPollList$$);
    const prevPoll = store.getState().poll.poll;
    const pollData = {
      ...prevPoll,
      'uniqPollId' : {
        id: 'uniqPollId',
        writer: 'username',
        question: 'question',
        options: [
          {title: 'option1', voter: []},
          {title: 'option2', voter: []},
          {title: 'option3', voter: []}
        ],
        startDate: 0,
        endDate: 0,
        voted: false
      }
    };

    store.dispatch(toggleModal());
    store.dispatch(updatePoll(pollData));

    expect(prevPoll === store.getState().poll.poll).toBeFalsy();
    expect(Object.keys(prevPoll).length + 1 === Object.keys(store.getState().poll.poll).length).toBeTruthy();
  });
});