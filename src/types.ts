export type UserStateType = {
  email: string;
};

export type WalletStateType = {
  currencies: string[];
  expenses: ExpensesType[];
  editor: boolean,
  editingId: number,
};

export type ReduxStateType = {
  user: UserStateType;
  wallet: WalletStateType;
};

export type ExpensesType = {
  id: number;
  value: string;
  description: string,
  currency: string;
  method: string;
  tag: string;
  exchangeRates: { [key: string]: ExchangeRatesType }
};

export type ExchangeRatesType = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};
