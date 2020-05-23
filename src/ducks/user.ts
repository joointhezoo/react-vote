import {storage} from 'api';
import {createReducer} from '@reduxjs/toolkit';

interface User {
  userName: string;
}

const USER_STATE: User = {
  userName: storage.getUserName() || ''
};

export default createReducer(USER_STATE, () => {});