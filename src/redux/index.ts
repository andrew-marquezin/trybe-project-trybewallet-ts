import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

if (window.Cypress) {
  window.store = store;
}
