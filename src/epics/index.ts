import {Epic, combineEpics} from 'redux-observable';
import {filter, map, switchMap} from 'rxjs/operators';
import {addPoll, deletePoll, toggleModal, updatePoll, selectOption, Poll} from 'ducks';
import {uniquePollId} from 'utils';
import user from "../ducks/user";

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
      status: 'pending',
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

const selectOption$$: Epic = (action$, state$) => action$.pipe(
  filter(selectOption.match),
  map(({payload: {id, index}}) => {
    const {poll: {poll}, user: {userName}} = state$.value;
    /*const pollData = poll.map((detail: Poll) => {
      if (detail.id === id) {
        return {
          ...detail,
          options: detail.options.map((option, i) => {
            if (i === index) {
              !option.voter.includes(userName) && option.voter.push(userName);
            }
            return option;
          })
        }
      }
      return detail
    });*/
    return updatePoll(poll);
  })
);

export default combineEpics(
  addPollList$$,
  deletePollList$$,
  selectOption$$,
);