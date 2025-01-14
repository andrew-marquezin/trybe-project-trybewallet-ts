import { AnyAction } from 'redux';
import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_CURRENCIES,
  SAVE_EXPENSE,
  SELECT_EDITING_EXPENSE,
} from '../actions';
import { ExpensesType } from '../../types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  editingId: 0,
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
    case SELECT_EDITING_EXPENSE:
      return ({
        ...state,
        editor: action.payload.editor,
        editingId: action.payload.editingId,
      });
    case EDIT_EXPENSE:
      return ({
        ...state,
        expenses: [...action.payload],
        editor: false,
      });
    default: return state;
  }
};

export default wallet;
