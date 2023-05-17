import { usersTypes } from './users_types';

const initUsers = {
  users: [],
  loading: false,
  error: null,
};

function usersReducer(state = initUsers, { type, payload }) {
  switch (type) {
    case usersTypes.FETCH_ALL_USERS_START:
      return {
        ...state,
        loading: true,
      };

    case usersTypes.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };

    case usersTypes.FETCH_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}

export default usersReducer;
