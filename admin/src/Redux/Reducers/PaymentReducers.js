import {
  PAYMENT_GET_ALL_FAIL,
  PAYMENT_GET_ALL_REQUEST,
  PAYMENT_GET_ALL_SUCCESS,
} from "../Constants/PaymentConstants";

export const listPaymentsReducers = (state = { payments: [] }, action) => {
  switch (action.type) {
    case PAYMENT_GET_ALL_REQUEST:
      return { loading: true };
    case PAYMENT_GET_ALL_SUCCESS:
      return { loading: false, payments: action.payload };
    case PAYMENT_GET_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
