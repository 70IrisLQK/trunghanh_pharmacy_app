import
{
  ORDER_STATUS_FAIL,
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_RESET,
  ORDER_STATUS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_ID_FAIL,
  ORDER_ID_REQUEST,
  ORDER_ID_SUCCESS,
  ORDER_USER_ID_REQUEST,
  ORDER_USER_ID_SUCCESS,
  ORDER_USER_ID_FAIL,
  ORDER_DEBT_REQUEST,
  ORDER_DEBT_SUCCESS,
  ORDER_DEBT_FAIL,
  ORDER_DEBT_RESET,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
  ORDER_EDIT_REQUEST,
  ORDER_EDIT_SUCCESS,
  ORDER_EDIT_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_RESET,
} from "../Constants/OrderConstants";

export const orderListReducer = (state = { orders: [] }, action) =>
{
  switch (action.type)
  {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ORDER DETAILS
export const orderDetailsReducer = (
  state = { loading: true, order: [] },
  action
) =>
{
  switch (action.type)
  {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderByIdReducer = (
  state = { loading: true, order: [] },
  action
) =>
{
  switch (action.type)
  {
    case ORDER_ID_REQUEST:
      return { ...state, loading: true };
    case ORDER_ID_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderByUserIdReducer = (
  state = { loading: true, order: [] },
  action
) =>
{
  switch (action.type)
  {
    case ORDER_USER_ID_REQUEST:
      return { ...state, loading: true };
    case ORDER_USER_ID_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_USER_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ORDER STATUS
export const orderStatusReducer = (state = {}, action) =>
{
  switch (action.type)
  {
    case ORDER_STATUS_REQUEST:
      return { loading: true };
    case ORDER_STATUS_SUCCESS:
      return { loading: false, success: true };
    case ORDER_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_STATUS_RESET:
      return {};
    default:
      return state;
  }
};

export const orderUpdateDebtReducer = (state = {}, action) =>
{
  switch (action.type)
  {
    case ORDER_DEBT_REQUEST:
      return { loading: true };
    case ORDER_DEBT_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DEBT_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DEBT_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) =>
{
  switch (action.type)
  {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};


export const orderEditReducer = (state = { order: { reviews: [] } }, action) =>
{
  switch (action.type)
  {
    case ORDER_EDIT_REQUEST:
      return { ...state, loading: true };
    case ORDER_EDIT_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE ORDER
export const orderUpdateReducer = (state = { order: {} }, action) =>
{
  switch (action.type)
  {
    case ORDER_UPDATE_REQUEST:
      return { loading: true };
    case ORDER_UPDATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_UPDATE_RESET:
      return { order: {} };
    default:
      return state;
  }
};
