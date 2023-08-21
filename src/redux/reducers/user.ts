import { AnyAction } from 'redux';
import { UPDT_USER_EMAIL } from '../actions';

const INITIAL_STATE = { email: '' };

const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UPDT_USER_EMAIL:
      return ({
        ...state,
        email: action.payload });
    default: return state;
  }
};

export default user;
