import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ReduxState } from '../types';
import { getCurrencies } from '../services/api';
import { saveCurrencies } from '../redux/actions';

function WalletForm() {
  const { wallet } = useSelector((state: ReduxState) => state);
  const { currencies } = wallet;

  const INITIAL_VALUES = {
    id: 0,
    value: 0,
    description: '',
    currency: currencies[0],
    payMethod: 'Dinheiro',
    tag: 'Alimentação',
  };

  const [expenses, setExpenses] = useState(INITIAL_VALUES);
  const dispatch = useDispatch();

  useEffect(() => {
    const apiRequest = async () => {
      const data = await getCurrencies();
      const fCurrencies = Object.keys(data).filter((c) => (c !== 'USDT'));
      dispatch(saveCurrencies(fCurrencies));
      setExpenses({
        ...expenses,
        currency: fCurrencies[0],
      });
    };
    apiRequest();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value: inputValue } = e.target;
    setExpenses({
      ...expenses,
      [name]: inputValue,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(expenses);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            id="value-input"
            data-testid="value-input"
            name="value"
            value={ expenses.value }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ expenses.description }
            onChange={ handleChange }
            id="description-input"
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
            onChange={ handleChange }
            name="currency"
          >
            { currencies.map((c) => (
              <option value={ c } key={ c }>{c}</option>
            )) }
          </select>
        </label>

        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method-input"
            onChange={ handleChange }
            name="payMethod"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
            onChange={ handleChange }
            name="tag"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button>
            Adicionar despesa
          </button>
        </label>
      </form>
    </div>
  );
}

export default WalletForm;
