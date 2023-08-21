import { vi } from 'vitest';
import { waitFor } from '@testing-library/dom';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const API_ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

global.fetch = vi.fn().mockResolvedValue({
  json: async () => (mockData),
});

describe('Testa as funcionalidades da Wallet Page', () => {
  const defaultValues = {
    id: 0,
    value: '5',
    description: 'teste',
    currency: 'DOGE',
    method: 'Cartão de crédito',
    tag: 'Saúde',
    exchangeRates: mockData,
  };

  it('testa se os campos funcionam corretamente', async () => {
    const screen = renderWithRouterAndRedux(<Wallet />);
    const { user, store } = screen;

    const valueInput = screen.getByLabelText(/Valor:/i);
    const descInput = screen.getByLabelText(/Descrição:/i);
    const currSelect = screen.getByLabelText(/Moeda:/i);
    const methodSelect = screen.getByLabelText(/Método de pagamento:/i);
    const tagSelect = screen.getByLabelText(/Categoria:/i);
    const addBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    const totalCurrency = screen.getByText(/BRL/i);

    await waitFor(() => {
      expect(currSelect).toHaveValue('USD');
      expect(methodSelect).toHaveValue('Dinheiro');
      expect(tagSelect).toHaveValue('Alimentação');
    }, { timeout: 5000 });

    await user.type(valueInput, defaultValues.value);
    await user.type(descInput, defaultValues.description);
    await user.selectOptions(currSelect, defaultValues.currency);
    await user.selectOptions(methodSelect, defaultValues.method);
    await user.selectOptions(tagSelect, defaultValues.tag);

    expect(valueInput).toHaveValue(Number(defaultValues.value));
    expect(descInput).toHaveValue(defaultValues.description);
    expect(currSelect).toHaveValue(defaultValues.currency);
    expect(methodSelect).toHaveValue(defaultValues.method);
    expect(tagSelect).toHaveValue(defaultValues.tag);
    expect(totalCurrency).toBeInTheDocument();

    await user.click(addBtn);

    expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINT);

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
    }, { timeout: 5000 });

    expect(valueInput).toHaveValue(null);
    expect(descInput).toHaveValue('');

    const editBtn = screen.getByRole('button', { name: /Editar/i });

    await user.click(editBtn);

    const saveBtn = screen.getByRole('button', { name: /editar despesa/i });
    expect(saveBtn).toBeInTheDocument();

    await user.type(descInput, 'editado');
    await user.click(saveBtn);

    expect(screen.getByText(/editado/i)).toBeInTheDocument();
  });
});
