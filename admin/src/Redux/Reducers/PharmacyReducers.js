import {
  PHARMACY_LIST_FAIL,
  PHARMACY_LIST_REQUEST,
  PHARMACY_LIST_SUCCESS,
} from "../Constants/PharmacyConstants";

export const pharmacyListReducer = (state = { pharmacies: [] }, action) => {
  switch (action.type) {
    case PHARMACY_LIST_REQUEST:
      return { loading: true, pharmacies: [] };
    case PHARMACY_LIST_SUCCESS:
      return { loading: false, pharmacies: action.payload };
    case PHARMACY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
