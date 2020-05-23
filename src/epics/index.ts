import {Epic, combineEpics} from 'redux-observable';
import {filter, map, switchMap} from 'rxjs/operators';
import {addPoll, deletePoll, toggleModal, updatePoll, Poll} from 'ducks';
import {uniquePollId} from 'utils';

const addPollList$$: Epic = (action$, state$) => action$.pipe(
  filter(addPoll.match),
  switchMap(({payload: {question, options}}) => {
    const {poll: {poll}, user: {userName}} = state$.value;
    const pollData = [
      ...poll,
      {
      id: uniquePollId(),
      writer: userName,
      question,
      options,
      status: 'process',
    }];
    return [
      updatePoll(pollData),
      toggleModal()
    ]
  })
);

const deletePollList$$: Epic = (action$, state$) => action$.pipe(
  filter(deletePoll.match),
  map(({payload}) => {
    const {poll: {poll}} = state$.value;
    const pollData = poll.filter(({id}: Pick<Poll, 'id'>) => id !== payload);
    return updatePoll(pollData);
  })
);

export default combineEpics(
  addPollList$$,
  deletePollList$$,
);