import { useSelector } from 'react-redux';
import { ReduxStateType } from '../types';

function Header() {
  const { user, wallet } = useSelector((state: ReduxStateType) => state);
  const expensesSum = wallet.expenses.reduce((sum, curr) => {
    return sum + (Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask));
  }, 0);

  return (
    <header>
      <h3 data-testid="email-field">{ user.email }</h3>
      <span data-testid="total-field">{expensesSum.toFixed(2)}</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}

export default Header;
