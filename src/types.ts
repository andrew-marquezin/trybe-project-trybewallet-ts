export type UserState = {
  email: string;
};

export type WalletState = {
  currencies: string[];
  expenses: Expenses[];
};

export type ReduxState = {
  user: UserState;
  wallet: WalletState;
};

export type Expenses = {
  id: number;
  value: string;
  description: string,
  currency: string;
  method: string;
  tag: string;
};
