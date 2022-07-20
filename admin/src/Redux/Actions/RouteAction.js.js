import {
  ROUTE_CREATE_FAIL,
  ROUTE_CREATE_REQUEST,
  ROUTE_CREATE_SUCCESS,
  ROUTE_DELETE_FAIL,
  ROUTE_DELETE_REQUEST,
  ROUTE_DELETE_SUCCESS,
  ROUTE_EDIT_FAIL,
  ROUTE_EDIT_REQUEST,
  ROUTE_EDIT_SUCCESS,
  ROUTE_LIST_FAIL,
  ROUTE_LIST_REQUEST,
  ROUTE_LIST_SUCCESS,
  ROUTE_UPDATE_FAIL,
  ROUTE_UPDATE_REQUEST,
  ROUTE_UPDATE_SUCCESS,
} from "../Constants/RouteConstants";

import axios from "axios";
import { logout } from "./UserActions";
import { BASE_URL } from "../Constants/BaseUrl";
export const listRoutes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ROUTE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/routes`, config);

    dispatch({ type: ROUTE_LIST_SUCCESS, payload: data.routes });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ROUTE_LIST_FAIL,
      payload: message,
    });
  }
};

export const createRoute =
  (salesName, pharmacyName, routeName, weekDate, status) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ROUTE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/admin/routes`,
        { salesName, pharmacyName, routeName, weekDate, status },
        config
      );

      dispatch({ type: ROUTE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ROUTE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteRoute = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ROUTE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${BASE_URL}/api/routes/${id}`, config);

    dispatch({ type: ROUTE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ROUTE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const editRoute = (id) => async (dispatch) => {
  try {
    dispatch({ type: ROUTE_EDIT_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/admin/routes/${id}`);
    dispatch({ type: ROUTE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ROUTE_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE ROUTE
export const updateRoute =
  (salesName, pharmacyName, routeName, weekDate, status, routeId) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ROUTE_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/admin/routes/${routeId}`,
        { salesName, pharmacyName, routeName, weekDate, status, routeId },
        config
      );
      dispatch({ type: ROUTE_UPDATE_SUCCESS, payload: data });
      dispatch({ type: ROUTE_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ROUTE_UPDATE_FAIL,
        payload: message,
      });
    }
  };
