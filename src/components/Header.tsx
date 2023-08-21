import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Header() {
  const { user } = useSelector((state: ReduxState) => state);

  return (
    <header>
      <h3 data-testid="email-field">{ user.email }</h3>
      <span data-testid="total-field">0</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}

export default Header;
