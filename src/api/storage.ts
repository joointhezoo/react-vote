import {createUserName} from 'utils';

export default class Storage {
  getUserName() {
    try {
      const userName = localStorage.getItem('userName') || createUserName();
      localStorage.setItem('userName', userName);
      return userName;
    } catch (err) {
      console.error(`Error occurred in getUserName -> `, err);
    }
  };
}