import
  {
    TRANSACTION_GET_ID_FAIL,
    TRANSACTION_GET_ID_REQUEST,
    TRANSACTION_GET_ID_SUCCESS,
    TRANSACTION_GET_USER_ID_FAIL,
    TRANSACTION_GET_USER_ID_REQUEST,
    TRANSACTION_GET_USER_ID_SUCCESS,
  } from "../Constants/TransactionConstants";
import { logout } from "./UserActions";
import axios from "axios";
import { BASE_URL } from "../Constants/BaseUrl";

export const getTransactionById = (order_id) => async (dispatch, getState) =>
{
  try
  {
    dispatch({ type: TRANSACTION_GET_ID_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/transactions/${order_id}`,
      config
    );
    dispatch({ type: TRANSACTION_GET_ID_SUCCESS, payload: data.transactions });
  } catch (error)
  {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed")
    {
      dispatch(logout());
    }
    dispatch({
      type: TRANSACTION_GET_ID_FAIL,
      payload: message,
    });
  }
};

export const getTransactionByUserId =
  (user_id) => async (dispatch, getState) =>
  {
    try
    {
      dispatch({ type: TRANSACTION_GET_USER_ID_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${BASE_URL}/api/transactions/user/${user_id}`,
        config
      );
      dispatch({
        type: TRANSACTION_GET_USER_ID_SUCCESS,
        payload: data.transactions,
      });
    } catch (error)
    {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed")
      {
        dispatch(logout());
      }
      dispatch({
        type: TRANSACTION_GET_USER_ID_FAIL,
        payload: message,
      });
    }
  };
