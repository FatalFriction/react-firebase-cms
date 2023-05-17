
import { usersTypes } from './users_types';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const fetchUsersStart = () => ({
  type: usersTypes.FETCH_ALL_USERS_START,
});

const fetchUsersSuccess = (users) => ({
  type: usersTypes.FETCH_ALL_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFail = (error) => ({
  type: usersTypes.FETCH_ALL_USERS_FAIL,
  payload: error,
});

export function fetchUsers(uid) {
  return async (dispatch) => {
    // Dispatch the action to indicate that the fetching process has started
    dispatch(fetchUsersStart());
    try {
      // Get the document from the database
      const userDoc = await getDoc(doc(db, 'users', uid));
      // Create an object with the id and data from the document
      if(userDoc.exists())
      {
      const userData = { id: userDoc.id, ...userDoc.data() };
      // Dispatch the success action with the USERS data
      dispatch(fetchUsersSuccess(userData));
      } else {
      throw new Error('user not found');
    }} catch (error) {
      // Dispatch the fail action with the error
      dispatch(fetchUsersFail(error));
    }
  };
};
