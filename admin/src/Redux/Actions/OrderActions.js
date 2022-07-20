import
{
  ORDER_STATUS_FAIL,
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_ID_REQUEST,
  ORDER_ID_SUCCESS,
  ORDER_ID_FAIL,
  ORDER_USER_ID_REQUEST,
  ORDER_USER_ID_SUCCESS,
  ORDER_USER_ID_FAIL,
  ORDER_DEBT_REQUEST,
  ORDER_DEBT_FAIL,
  ORDER_DEBT_SUCCESS,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_EDIT_SUCCESS,
  ORDER_EDIT_REQUEST,
  ORDER_EDIT_FAIL,
  ORDER_UPDATE_FAIL,
} from "../Constants/OrderConstants";
import { logout } from "./UserActions";
import axios from "axios";
import { BASE_URL } from "../Constants/BaseUrl";
export const listOrders = () => async (dispatch, getState) =>
{
  try
  {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/orders`, config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data.orders });
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
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) =>
{
  try
  {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/order_detail/${id}`,
      config
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.orderDetails });
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
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// ORDER BY ID
export const getOrderById = (id) => async (dispatch, getState) =>
{
  try
  {
    dispatch({ type: ORDER_ID_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/admin/orders/${id}`,
      config
    );

    dispatch({ type: ORDER_ID_SUCCESS, payload: data.orders });
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
      type: ORDER_ID_FAIL,
      payload: message,
    });
  }
};

export const getOrderByUserId = (id) => async (dispatch, getState) =>
{
  try
  {
    dispatch({ type: ORDER_USER_ID_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(`${BASE_URL}/api/orders/${id}`)
    const { data } = await axios.get(`${BASE_URL}/api/orders/${id}`, config);

    dispatch({ type: ORDER_USER_ID_SUCCESS, payload: data.orders });
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
      type: ORDER_USER_ID_FAIL,
      payload: message,
    });
  }
};

// ORDER EDIT STATUS
export const changeOrderStatus = (orders) => async (dispatch, getState) =>
{
  try
  {
    dispatch({ type: ORDER_STATUS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${BASE_URL}/api/orders/${orders.order_id}`,
      orders,
      config
    );
    dispatch({ type: ORDER_STATUS_SUCCESS, payload: data });
  } catch (error)
  {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "Not authorized, token failed")
    {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_STATUS_FAIL,
      payload: message,
    });
  }
};

export const updateOrderDebt = (orders) => async (dispatch, getState) =>
{
  console.log(orders);
  try
  {
    dispatch({ type: ORDER_DEBT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${BASE_URL}/api/update_order/${orders.order_id}`,
      orders,
      config
    );
    dispatch({ type: ORDER_DEBT_SUCCESS, payload: data });
  } catch (error)
  {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "Not authorized, token failed")
    {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DEBT_FAIL,
      payload: message,
    });
  }
};


export const deleteOrder = (id) => async (dispatch, getState) =>
{
  try
  {
    dispatch({ type: ORDER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(id)
    await axios.delete(`${BASE_URL}/api/orders/${id}`, config);

    dispatch({ type: ORDER_DELETE_SUCCESS });
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
      type: ORDER_DELETE_FAIL,
      payload: message,
    });
  }



}

export const editOrder = (id) => async (dispatch) =>
{
  try
  {
    dispatch({ type: ORDER_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/orders/${id}`);
    dispatch({ type: ORDER_EDIT_SUCCESS, payload: data });
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
      type: ORDER_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE ORDER
export const updateOrder = (orderId) => async (dispatch, getState) =>
{
  try
  {
    dispatch({ type: ORDER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(`${BASE_URL}/api/order_account/${orderId}`, {}, config);
    dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: ORDER_EDIT_SUCCESS, payload: data });
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
      type: ORDER_UPDATE_FAIL,
      payload: message,
    });
  }
};