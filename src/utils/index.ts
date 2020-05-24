import {format} from 'date-fns';

export const createUserName = () => {
  return Date.now().toString(36);
};

export const uniquePollId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getEpochTime = (inputDate: string) => {
  const date = new Date(inputDate);
  return date.valueOf();
};

export const DateYYYYMMDDHHMM = (epoch: number) => {
  return format(epoch, 'yyyy-MM-dd HH:mm')
};