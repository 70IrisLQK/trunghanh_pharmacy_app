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
  NOTE_TYPE_UPDATE_RESET,
  NOTE_TYPE_DELETE_RESET,
  NOTE_TYPE_CREATE_RESET,
} from "../Constants/NoteTypeConstants";

// ALL NOTES TYPE
export const noteTypeListReducer = (state = { note_types: [] }, action) => {
  switch (action.type) {
    case NOTE_TYPE_LIST_REQUEST:
      return { loading: true, note_types: [] };
    case NOTE_TYPE_LIST_SUCCESS:
      return { loading: false, note_types: action.payload };
    case NOTE_TYPE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const noteTypeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_TYPE_CREATE_REQUEST:
      return { loading: true };
    case NOTE_TYPE_CREATE_SUCCESS:
      return { loading: false, success: true, note_types: action.payload };
    case NOTE_TYPE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case NOTE_TYPE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const noteTypeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_TYPE_DELETE_REQUEST:
      return { loading: true };
    case NOTE_TYPE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NOTE_TYPE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case NOTE_TYPE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const noteTypeEditReducer = (state = { note_type: {} }, action) => {
  switch (action.type) {
    case NOTE_TYPE_EDIT_REQUEST:
      return { ...state, loading: true };
    case NOTE_TYPE_EDIT_SUCCESS:
      return { loading: false, note_type: action.payload };
    case NOTE_TYPE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE NOTE
export const noteTypeUpdateReducer = (state = { note_type: {} }, action) => {
  switch (action.type) {
    case NOTE_TYPE_UPDATE_REQUEST:
      return { loading: true };
    case NOTE_TYPE_UPDATE_SUCCESS:
      return { loading: false, success: true, note_types: action.payload };
    case NOTE_TYPE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case NOTE_TYPE_UPDATE_RESET:
      return { note_type: {} };
    default:
      return state;
  }
};
