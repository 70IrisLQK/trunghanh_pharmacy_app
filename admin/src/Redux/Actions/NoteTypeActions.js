import {
  NOTE_TYPE_LIST_FAIL,
  NOTE_TYPE_LIST_REQUEST,
  NOTE_TYPE_LIST_SUCCESS,
  NOTE_TYPE_CREATE_FAIL,
  NOTE_TYPE_CREATE_REQUEST,
  NOTE_TYPE_CREATE_SUCCESS,
  NOTE_TYPE_DELETE_REQUEST,
  NOTE_TYPE_DELETE_SUCCESS,
  NOTE_TYPE_DELETE_FAIL,
  NOTE_TYPE_EDIT_REQUEST,
  NOTE_TYPE_EDIT_SUCCESS,
  NOTE_TYPE_EDIT_FAIL,
  NOTE_TYPE_UPDATE_REQUEST,
  NOTE_TYPE_UPDATE_SUCCESS,
  NOTE_TYPE_UPDATE_FAIL,
} from "../Constants/NoteTypeConstants";

import axios from "axios";
import { logout } from "./UserActions";
import { BASE_URL } from "../Constants/BaseUrl";

export const listNoteTypes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_TYPE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/api/note_type`, config);
    dispatch({ type: NOTE_TYPE_LIST_SUCCESS, payload: data.note_types });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTE_TYPE_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNoteType =
  (name, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTE_TYPE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/note_type`,
        { name, description },
        config
      );

      dispatch({ type: NOTE_TYPE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: NOTE_TYPE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteNoteType = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_TYPE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${BASE_URL}/api/note_type/${id}`, config);

    dispatch({ type: NOTE_TYPE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTE_TYPE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const editNoteType = (id) => async (dispatch) => {
  try {
    dispatch({ type: NOTE_TYPE_EDIT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/note_type/${id}`);

    dispatch({ type: NOTE_TYPE_EDIT_SUCCESS, payload: data.note_types });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTE_TYPE_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE NOTE
export const updateNoteType =
  (name, description, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTE_TYPE_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/note_type/${id}`,
        { name, description },
        config
      );
      dispatch({ type: NOTE_TYPE_UPDATE_SUCCESS, payload: data });
      dispatch({ type: NOTE_TYPE_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: NOTE_TYPE_UPDATE_FAIL,
        payload: message,
      });
    }
  };
