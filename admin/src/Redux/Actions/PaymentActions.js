import {
  PAYMENT_GET_ALL_FAIL,
  PAYMENT_GET_ALL_REQUEST,
  PAYMENT_GET_ALL_SUCCESS,
} from "../Constants/PaymentConstants";
import { logout } from "./UserActions";
import axios from "axios";
import { BASE_URL } from "../Constants/BaseUrl";

export const listPayments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PAYMENT_GET_ALL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/payments`, config);
    dispatch({ type: PAYMENT_GET_ALL_SUCCESS, payload: data.payments });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PAYMENT_GET_ALL_FAIL,
      payload: message,
    });
  }
};
