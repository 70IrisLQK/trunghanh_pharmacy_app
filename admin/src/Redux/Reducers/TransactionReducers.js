import {
  TRANSACTION_GET_ID_FAIL,
  TRANSACTION_GET_ID_REQUEST,
  TRANSACTION_GET_ID_SUCCESS,
  TRANSACTION_GET_USER_ID_FAIL,
  TRANSACTION_GET_USER_ID_REQUEST,
  TRANSACTION_GET_USER_ID_SUCCESS,
} from "../Constants/TransactionConstants";

export const getTransactionsByOrderIdReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_GET_ID_REQUEST:
      return { loading: true };
    case TRANSACTION_GET_ID_SUCCESS:
      return { loading: false, transactions: action.payload };
    case TRANSACTION_GET_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTransactionsByUserIdReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_GET_USER_ID_REQUEST:
      return { loading: true };
    case TRANSACTION_GET_USER_ID_SUCCESS:
      return { loading: false, transactions: action.payload };
    case TRANSACTION_GET_USER_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
