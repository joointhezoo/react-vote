import {createUserName, uniquePollId, getEpochTime, DateYYYYMMDDHHMM, getStatus} from 'utils';

describe('utils', () => {
  it ('createUserName', async () => {
    const makeId = createUserName();
    const makeId2 = createUserName();

    expect(makeId === makeId2).toBeFalsy();
  });

  it ('uniquePollId', async () => {
    const makeId = uniquePollId();
    const makeId2 = uniquePollId();

    expect(makeId === makeId2).toBeFalsy();
  });

  it ('getEpochTime', async () => {
    const date1 = getEpochTime('2020-05-20 12:22');
    const date2 = getEpochTime('no date');

    expect(date1).not.toBeNaN();
    expect(date2).toBeNaN();
  });

  it ('DateYYYYMMDDHHMM', async () => {
    const date = DateYYYYMMDDHHMM(1589944920000);

    expect(date).toBe('2020-05-20 12:22');
  });

  it ('getStatus', async () => {
    const pendingDate1 = getEpochTime('2024-05-20 00:01');
    const pendingDate2 = getEpochTime('2024-05-24 00:01');
    const onGoingDate1 = getEpochTime('2018-05-20 00:01');
    const onGoingDate2 = getEpochTime('2024-05-24 00:01');
    const endedDate1 = getEpochTime('2018-05-20 00:01');
    const endedDate2 = getEpochTime('2019-05-24 00:01');

    const pending = getStatus(pendingDate1, pendingDate2);
    const ongoing = getStatus(onGoingDate1, onGoingDate2);
    const ended = getStatus(endedDate1, endedDate2);

    expect(pending).toStrictEqual('pending');
    expect(ongoing).toStrictEqual('ongoing');
    expect(ended).toStrictEqual('ended');
  });
});