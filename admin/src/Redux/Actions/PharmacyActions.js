import {
  PHARMACY_LIST_FAIL,
  PHARMACY_LIST_REQUEST,
  PHARMACY_LIST_SUCCESS,
} from "../Constants/PharmacyConstants";

import axios from "axios";
import { logout } from "./UserActions";
import { BASE_URL } from "../Constants/BaseUrl";
export const listPharmacy = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PHARMACY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/api/pharmacies`, config);

    dispatch({ type: PHARMACY_LIST_SUCCESS, payload: data.pharmacies });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PHARMACY_LIST_FAIL,
      payload: message,
    });
  }
};
