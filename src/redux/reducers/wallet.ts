import { AnyAction } from 'redux';
import { DELETE_EXPENSE, SAVE_CURRENCIES, SAVE_EXPENSE } from '../actions';
import { ExpensesType } from '../../types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SAVE_CURRENCIES:
      return ({
        ...state,
        currencies: action.payload,
      });
    case SAVE_EXPENSE:
      return ({
        ...state,
        expenses: [...state.expenses,
          action.payload],
      });
    case DELETE_EXPENSE:
      return ({
        ...state,
        expenses: state.expenses.filter((e: ExpensesType) => e.id !== action.payload),
      });
    default: return state;
  }
};

export default wallet;
