import { combineReducers } from 'redux';

import productsReducer from './Products/products_reducers';
import usersReducer from './Users/users_reducers';
import ordersReducer from './Orders/orders_reducers';

const appReducers = combineReducers({
  products: productsReducer,
  users: usersReducer,
  orders: ordersReducer,
});

export default appReducers;
