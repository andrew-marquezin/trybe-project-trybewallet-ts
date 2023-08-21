import { ExpensesType } from '../../types';

export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SABE_EXPENSES';

export const userAction = (userEmail: string) => {
  return {
    type: UPDATE_USER_EMAIL,
    payload: userEmail,
  };
};

export const saveCurrencies = (currencies: string[]) => {
  return {
    type: SAVE_CURRENCIES,
    payload: currencies,
  };
};

export const saveExpense = (expense: ExpensesType) => {
  return {
    type: SAVE_EXPENSE,
    payload: expense,
  };
};
