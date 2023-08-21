// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testa as funcionalidades da Login Page', () => {
  it('testa se o fluxo de login está correto', async () => {
    const screen = renderWithRouterAndRedux(<Login />);
    const { user, store } = screen;

    const defaultUser = {
      email: 'tryber@teste.com',
      password: '123456',
    };

    const defaultStorage = {
      user: {
        email: defaultUser.email,
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        editingId: 0,
      },
    };

    const submitBtn = screen.getByRole('button', { name: /Entrar/i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toHaveProperty('disabled', true);

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Senha/i);

    await user.type(emailInput, defaultUser.email);
    await user.type(passwordInput, defaultUser.password);

    expect(submitBtn).toHaveProperty('disabled', false);

    await user.click(submitBtn);

    expect(store.getState()).toEqual(defaultStorage);
  });
});
