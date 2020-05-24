import {Epic, combineEpics} from 'redux-observable';
import {filter, map, switchMap} from 'rxjs/operators';
import {addPoll, deletePoll, toggleModal, updatePoll, selectOption, OptionItem, modifyPoll} from 'ducks';
import {uniquePollId} from 'utils';

const addPollList$$: Epic = (action$, state$) => action$.pipe(
  filter(addPoll.match),
  switchMap(({payload: {startDate, endDate, question, options}}) => {
    const {poll: {poll}, user: {userName}} = state$.value;
    const makeId = uniquePollId();
    const pollData = {
      ...poll,
      [makeId] : {
        id: makeId,
        writer: userName,
        question,
        options,
        startDate,
        endDate,
        status: 'pending',
      }
    };
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
    const pollData = {...poll};
    delete pollData[payload];

    return updatePoll(pollData);
  })
);

const selectOption$$: Epic = (action$, state$) => action$.pipe(
  filter(selectOption.match),
  map(({payload: {id, index}}) => {
    const {poll: {poll}, user: {userName}} = state$.value;
    const pollData = {
      ...poll,
      [id]: {
        ...poll[id],
        options: poll[id].options.map((option: OptionItem, i: number) => {
          return {
            ...option,
            voter: [
              ...option.voter.filter(name => name !== userName),
              ...index ===i ? [userName] : []
            ]
          };
        })
      }
    };
    return updatePoll(pollData);
  })
);

const modifyPoll$$: Epic = (action$, state$) => action$.pipe(
  filter(modifyPoll.match),
  switchMap(({payload}) => {
    const {poll: {poll}} = state$.value;
    const pollData = {
      ...poll,
      [payload.id]: {
        ...poll[payload.id],
        ...payload
      }
    };
    return [
      updatePoll(pollData),
      toggleModal()
    ]
  })
);

export default combineEpics(
  addPollList$$,
  deletePollList$$,
  selectOption$$,
  modifyPoll$$,
);