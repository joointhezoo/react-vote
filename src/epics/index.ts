import {Epic, combineEpics} from 'redux-observable';
import {filter, switchMap} from 'rxjs/operators';
import {addPoll, toggleModal, updatePoll} from 'ducks';
import {uniquePollId} from 'utils';

const addPollList$$: Epic = (action$, state$) => action$.pipe(
  filter(addPoll.match),
  switchMap(({payload: {question, options}}) => {
    const {user: {userName}} = state$.value;
    const pollData = {
      id: uniquePollId(),
      writer: userName,
      question,
      options,
      status: 'process',
    };
    return [
      updatePoll(pollData),
      toggleModal()
    ]
  })
);

export default combineEpics(
  addPollList$$,
);