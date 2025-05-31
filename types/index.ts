export type CurrencyOption = {
  code: string;
  symbol: string;
};

export type User = {
  id: string;
  name: string;
  currency: CurrencyOption;
};

export type Budget = {
  id: string;
  userId: string;
  amount: number;
  spent: number;
};

export type Expense = {
  id: string;
  userId: string;
  amount: number;
  description: string;
  category?: string;
  date: string; // ISO string
};