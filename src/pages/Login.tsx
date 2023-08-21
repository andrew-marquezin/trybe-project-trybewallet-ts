import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAction } from '../redux/actions';

const INITIAL_INFO = {
  email: '',
  password: '',
};

function Login() {
  const [loginInfo, setLoginInfo] = useState(INITIAL_INFO);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userAction(loginInfo.email));
    navigate('/carteira');
  };

  const validateInputs = () => {
    const emailRegex = /^\w+@([\w\-.]+\.)+[\w-]{2,}$/;
    const validPass = loginInfo.password.length >= 6;
    const validEmail = emailRegex.test(loginInfo.email);
    return (validEmail && validPass);
  };

  return (
    <div>
      <h1>TrybeWallet</h1>
      <form
        onSubmit={ handleSubmit }
      >
        <input
          type="email"
          name="email"
          value={ loginInfo.email }
          placeholder="Email"
          data-testid="email-input"
          onChange={ handleChange }
        />
        <input
          type="password"
          name="password"
          value={ loginInfo.password }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ handleChange }
        />
        <button
          disabled={ !validateInputs() }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
