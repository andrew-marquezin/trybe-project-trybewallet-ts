import { ExpensesType } from '../../types';

export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SABE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SELECT_EDITING_EXPENSE = 'SELECT_EDITING_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

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

export const deleteExpense = (id: number) => {
  return {
    type: DELETE_EXPENSE,
    payload: id,
  };
};

export const selectEditingExpense = (editor:boolean, editingId: number) => {
  return {
    type: SELECT_EDITING_EXPENSE,
    payload: {
      editor,
      editingId,
    },
  };
};

export const editExpense = (expenses: ExpensesType[]) => {
  return {
    type: EDIT_EXPENSE,
    payload: expenses,
  };
};
