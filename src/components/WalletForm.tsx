import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ReduxStateType } from '../types';
import { getCurrencies } from '../services/api';
import { saveCurrencies, saveExpense } from '../redux/actions';

function WalletForm() {
  const { wallet } = useSelector((state: ReduxStateType) => state);
  const { currencies } = wallet;
  const editingForm = wallet.editor;
  const expensesArr = wallet.expenses;

  const INITIAL_VALUES = {
    id: 0,
    value: '',
    description: '',
    currency: currencies[0],
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  const [expense, setExpense] = useState(INITIAL_VALUES);
  const dispatch = useDispatch();

  useEffect(() => {
    const apiRequest = async () => {
      const data = await getCurrencies();
      const fCurrencies = Object.keys(data).filter((c) => (c !== 'USDT'));
      dispatch(saveCurrencies(fCurrencies));
      setExpense({
        ...expense,
        currency: fCurrencies[0],
      });
    };
    apiRequest();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingForm) {
      const data = await getCurrencies();
      dispatch(saveExpense({ ...expense, exchangeRates: data }));
      setExpense({
        ...expense,
        value: '',
        description: '',
        id: expense.id + 1,
      });
    } else {
      const editedExpensesList = expensesArr.map((item) => {
        if (item.id === wallet.editingId) {
          return {
            id: item.id,
            value: item.value,
            description: item.description,
            currency: item.currency,
            method: item.method,
            tag: item.tag,
            exchangeRates: item.exchangeRates,
          };
        } return item;
      });
    }
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
            value={ expense.value }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ expense.description }
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
            name="method"
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
            {editingForm ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </label>
      </form>
    </div>
  );
}

export default WalletForm;
