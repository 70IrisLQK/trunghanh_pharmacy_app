import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteEditReducer,
  noteListReducer,
  noteUpdateReducer,
} from "./Reducers/NoteReducers";
import {
  noteTypeCreateReducer,
  noteTypeDeleteReducer,
  noteTypeEditReducer,
  noteTypeListReducer,
  noteTypeUpdateReducer,
} from "./Reducers/NoteTypeReducers";
import {
  orderByIdReducer,
  orderByUserIdReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  orderEditReducer,
  orderListReducer,
  orderStatusReducer,
  orderUpdateDebtReducer,
  orderUpdateReducer,
} from "./Reducers/OrderReducres";
import { listPaymentsReducers } from "./Reducers/PaymentReducers";
import { pharmacyListReducer } from "./Reducers/PharmacyReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  routeEditReducer,
  routesCreateReducer,
  routesDeleteReducer,
  routesListReducer,
  routeUpdateReducer,
} from "./Reducers/RouteReducers";
import {
  getTransactionsByOrderIdReducer,
  getTransactionsByUserIdReducer,
} from "./Reducers/TransactionReducers";
import {
  userListReducer,
  userLoginReducer,
  userSalesListReducer,
} from "./Reducers/UserReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderByID: orderByIdReducer,
  orderByUserID: orderByUserIdReducer,
  orderStatus: orderStatusReducer,
  orderUpdateDebt: orderUpdateDebtReducer,
  orderDelete: orderDeleteReducer,
  orderUpdate: orderUpdateReducer,
  orderEdit: orderEditReducer,
  paymentList: listPaymentsReducers,
  transactionByOrderID: getTransactionsByOrderIdReducer,
  transactionByUserID: getTransactionsByUserIdReducer,
  noteList: noteListReducer,
  noteTypeList: noteTypeListReducer,
  pharmacyList: pharmacyListReducer,
  userSalesList: userSalesListReducer,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
  noteEdit: noteEditReducer,
  noteTypeCreate: noteTypeCreateReducer,
  noteTypeDelete: noteTypeDeleteReducer,
  noteTypeEdit: noteTypeEditReducer,
  noteTypeUpdate: noteTypeUpdateReducer,
  routeList: routesListReducer,
  routeCreate: routesCreateReducer,
  routeDelete: routesDeleteReducer,
  routeEdit: routeEditReducer,
  routeUpdate: routeUpdateReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
