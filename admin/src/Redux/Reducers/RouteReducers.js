import {
  ROUTE_CREATE_FAIL,
  ROUTE_CREATE_REQUEST,
  ROUTE_CREATE_RESET,
  ROUTE_CREATE_SUCCESS,
  ROUTE_DELETE_FAIL,
  ROUTE_DELETE_REQUEST,
  ROUTE_DELETE_RESET,
  ROUTE_DELETE_SUCCESS,
  ROUTE_EDIT_FAIL,
  ROUTE_EDIT_REQUEST,
  ROUTE_EDIT_SUCCESS,
  ROUTE_LIST_FAIL,
  ROUTE_LIST_REQUEST,
  ROUTE_LIST_SUCCESS,
  ROUTE_UPDATE_FAIL,
  ROUTE_UPDATE_REQUEST,
  ROUTE_UPDATE_RESET,
  ROUTE_UPDATE_SUCCESS,
} from "../Constants/RouteConstants";

// ALL ROUTES
export const routesListReducer = (state = { routes: [] }, action) => {
  switch (action.type) {
    case ROUTE_LIST_REQUEST:
      return { loading: true, routes: [] };
    case ROUTE_LIST_SUCCESS:
      return { loading: false, routes: action.payload };
    case ROUTE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const routesCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ROUTE_CREATE_REQUEST:
      return { loading: true };
    case ROUTE_CREATE_SUCCESS:
      return { loading: false, success: true, routes: action.payload };
    case ROUTE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ROUTE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const routesDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ROUTE_DELETE_REQUEST:
      return { loading: true };
    case ROUTE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ROUTE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ROUTE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const routeEditReducer = (state = { routes: [] }, action) => {
  switch (action.type) {
    case ROUTE_EDIT_REQUEST:
      return { ...state, loading: true };
    case ROUTE_EDIT_SUCCESS:
      return { loading: false, routes: action.payload };
    case ROUTE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE ROUTE
export const routeUpdateReducer = (state = { routes: {} }, action) => {
  switch (action.type) {
    case ROUTE_UPDATE_REQUEST:
      return { loading: true };
    case ROUTE_UPDATE_SUCCESS:
      return { loading: false, success: true, routes: action.payload };
    case ROUTE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ROUTE_UPDATE_RESET:
      return { routes: {} };
    default:
      return state;
  }
};
