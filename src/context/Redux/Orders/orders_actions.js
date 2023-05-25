
import { ordersTypes } from './orders_types';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const fetchOrdersStart = () => ({
  type: ordersTypes.FETCH_ALL_ORDER_START,
});

const fetchOrdersSuccess = (products) => ({
  type: ordersTypes.FETCH_ALL_ORDER_SUCCESS,
  payload: products,
});

const fetchOrdersFail = (error) => ({
  type: ordersTypes.FETCH_ALL_ORDER_FAIL,
  payload: error,
});

export function fetchorders(uid) {
  return async (dispatch) => {
    // Dispatch the action to indicate that the fetching process has started
    dispatch(fetchOrdersStart());
    try {
      // Get the document from the database
      const ordersDoc = await getDoc(doc(db, 'order', uid));
      // Create an object with the id and data from the document
      if(ordersDoc.exists())
      {
      const orderData = { id: ordersDoc.id, ...ordersDoc.data() };
      // Dispatch the success action with the order data
      dispatch(fetchOrdersSuccess(orderData));
      } else {
      throw new Error('Order not found');
    }} catch (error) {
      // Dispatch the fail action with the error
      dispatch(fetchOrdersFail(error));
    }
  };
};

export function fetchOrdersHome(orders) {
  return async (dispatch) => {
    // Dispatch the action to indicate that the fetching process has started
    dispatch(fetchOrdersStart());
    try {
      // Create an object with the id and data from the orders
      const orderData = { ...orders };
      // Dispatch the success action with the order data
      dispatch(fetchOrdersSuccess(orderData));
    } catch (error) {
      // Dispatch the fail action with the error
      dispatch(fetchOrdersFail(error));
    }
  };
}
