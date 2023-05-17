
import { productsTypes } from './products_types';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const fetchProductsStart = () => ({
  type: productsTypes.FETCH_ALL_PRODUCT_START,
});

const fetchProductsSuccess = (products) => ({
  type: productsTypes.FETCH_ALL_PRODUCT_SUCCESS,
  payload: products,
});

const fetchProductsFail = (error) => ({
  type: productsTypes.FETCH_ALL_PRODUCT_FAIL,
  payload: error,
});

export function fetchProducts(uid) {
  return async (dispatch) => {
    // Dispatch the action to indicate that the fetching process has started
    dispatch(fetchProductsStart());
    try {
      // Get the document from the database
      const productDoc = await getDoc(doc(db, 'products', uid));
      // Create an object with the id and data from the document
      if(productDoc.exists())
      {
      const productData = { id: productDoc.id, ...productDoc.data() };
      // Dispatch the success action with the product data
      dispatch(fetchProductsSuccess(productData));
      } else {
      throw new Error('Product not found');
    }} catch (error) {
      // Dispatch the fail action with the error
      dispatch(fetchProductsFail(error));
    }
  };
};
