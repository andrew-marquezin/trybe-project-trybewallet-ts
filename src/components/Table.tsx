import { useDispatch, useSelector } from 'react-redux';
import { ReduxStateType } from '../types';
import { deleteExpense } from '../redux/actions';

function Table() {
  const { expenses } = useSelector((state: ReduxStateType) => state.wallet);
  const dispatch = useDispatch();

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e) => {
          const cambio = Number(e.exchangeRates[e.currency].ask);
          return (
            <tr key={ e.id }>
              <td>{e.description}</td>
              <td>{e.tag}</td>
              <td>{e.method}</td>
              <td>{Number(e.value).toFixed(2)}</td>
              <td>{e.exchangeRates[e.currency].name}</td>
              <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
              <td>{(cambio * Number(e.value)).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                >
                  i
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => dispatch(deleteExpense(e.id)) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
