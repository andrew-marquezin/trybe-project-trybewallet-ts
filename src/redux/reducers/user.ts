import { AnyAction } from 'redux';
import { UPDATE_USER_EMAIL } from '../actions';

const INITIAL_STATE = { email: '' };

const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USER_EMAIL:
      return ({
        ...state,
        email: action.payload });
    default: return state;
  }
};

export default user;
