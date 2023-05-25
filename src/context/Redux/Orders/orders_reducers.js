import { ordersTypes } from './orders_types';

const initorder = {
  orders: [],
  loading: false,
  error: null,
};

function ordersReducer(state = initorder, { type, payload }) {
  switch (type) {
    case ordersTypes.FETCH_ALL_ORDER_START:
      return {
        ...state,
        loading: true,
      };

    case ordersTypes.FETCH_ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      };

    case ordersTypes.FETCH_ALL_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}

export default ordersReducer;
