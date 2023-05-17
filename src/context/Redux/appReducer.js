import { combineReducers } from 'redux';

import productsReducer from './Products/products_reducers';
import usersReducer from './Users/users_reducers';

const appReducers = combineReducers({
  products: productsReducer,
  users: usersReducer,
});

export default appReducers;
