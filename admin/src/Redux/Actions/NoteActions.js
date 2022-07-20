import axios from "axios";
import { BASE_URL } from "../Constants/BaseUrl";
import {
  NOTE_CREATE_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_DELETE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_EDIT_FAIL,
  NOTE_EDIT_REQUEST,
  NOTE_EDIT_SUCCESS,
  NOTE_LIST_FAIL,
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_UPDATE_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
} from "../Constants/NoteConstants";
import { logout } from "./UserActions";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/api/notes`, config);

    dispatch({ type: NOTE_LIST_SUCCESS, payload: data.notes });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTE_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNote = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/admin/notes/`,
      formData,
      config
    );

    dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTE_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteNote = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${BASE_URL}/api/notes/${id}`, config);

    dispatch({ type: NOTE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const editNote = (id) => async (dispatch) => {
  try {
    dispatch({ type: NOTE_EDIT_REQUEST });
    const { data } = await axios.get(`/api/notes/${id}`);
    dispatch({ type: NOTE_EDIT_SUCCESS, payload: data.notes[0] });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTE_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE NOTE
export const updateNote = (formData, noteId) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTE_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/api/admin/notes/${noteId}`,
      formData,
      config
    );
    dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: NOTE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: NOTE_UPDATE_FAIL,
      payload: message,
    });
  }
};
