import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import API, {BASE_URL} from './API';

export const CategoryImage = BASE_URL + 'assets/images/ProductImage/category/';
export const ProductImage = BASE_URL + 'assets/images/ProductImage/product/';

export const checkInternetConnection = () => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === false) {
      Toast.showWithGravity(
        'No internet connection',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  });
};

export const userLogin = async (username, password) => {
  const body = {
    username: username,
    password: password,
  };
  return await API({
    method: 'POST',
    url: '/api/auth/login',
    data: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then(res => {
      return res;
    })
    .catch(err => {
      Toast.showToast(err.message);
    });
};

export const userRegister = async (name, username, password) => {
  const body = {
    fname: name,
    lname: '',
    username: username,
    password: password,
  };
  return await API({
    method: 'POST',
    url: 'api/register',
    data: body,
  }).then(res => {
    return res;
  });
};

export const getAllCategory = async () => {
  return await API({
    method: 'GET',
    url: 'api/categories',
  }).then(res => {
    return res;
  });
};

export const getNewProducts = async () => {
  return await API({
    method: 'GET',
    url: 'api/products',
  }).then(res => {
    return res;
  });
};

export const getOrderStatus = async status => {
  return await API({
    method: 'GET',
    url: `api/order_status?status=${status}`,
  }).then(res => {
    return res;
  });
};

export const getPopularProducts = async () => {
  return await API({
    method: 'GET',
    url: 'api/products',
  }).then(res => {
    return res;
  });
};

export const getPharmacy = async () => {
  return await API({
    method: 'GET',
    url: 'api/pharmacies',
  }).then(res => {
    return res;
  });
};

export const getRoute = async user_id => {
  return await API({
    method: 'GET',
    url: `api/route_users?user=${user_id}`,
  }).then(res => {
    return res;
  });
};

export const getCheckIn = async (user_id, pharmacy_id) => {
  return await API({
    method: 'GET',
    url: `api/route_status?user=${user_id}&pharmacy=${pharmacy_id}`,
  }).then(res => {
    return res;
  });
};

export const getNote = async user_id => {
  return await API({
    method: 'GET',
    url: `api/notes?user=${user_id}`,
  }).then(res => {
    return res;
  });
};

export const getNoteType = async () => {
  return await API({
    method: 'GET',
    url: `api/note_type`,
  }).then(res => {
    return res;
  });
};

export const getProductList = async categoryId => {
  return await API({
    method: 'GET',
    url: `api/products?categories=${categoryId}`,
  }).then(res => {
    return res;
  });
};

export const updateUser = async user => {
  return await API({
    method: 'PUT',
    url: `api/user/${user.user_id}`,
    data: user,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }).then(res => {
    return res;
  });
};
export const searchProduct = async text => {
  return await API({
    method: 'GET',
    url: `api/products?name=${text}`,
  }).then(res => {
    return res;
  });
};

export const searchPharmacy = async text => {
  return await API({
    method: 'GET',
    url: `api/pharmacies?name=${text}`,
  }).then(res => {
    return res;
  });
};

export const addProblem = async formData => {
  return await API({
    method: 'POST',
    url: 'api/notes',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  }).then(res => {
    return res;
  });
};

export const salesCheckIn = async formData => {
  return await API({
    method: 'POST',
    url: 'api/check_in',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  }).then(res => {
    return res;
  });
};

export const createNewAddress = async newAddress => {
  return await API({
    method: 'POST',
    url: 'api/pharmacies',
    data: newAddress,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }).then(res => {
    return res;
  });
};

export const orderPlace = async orderDetails => {
  return await API({
    method: 'POST',
    url: 'api/sale_orders',
    data: orderDetails,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }).then(res => {
    return res;
  });
};

export const getOrder = async id => {
  return await API({
    method: 'GET',
    url: `api/orders/${id}`,
  }).then(res => {
    return res;
  });
};

export const getOrderDetails = async id => {
  return await API({
    method: 'GET',
    url: `api/order_detail/${id}`,
  }).then(res => {
    return res;
  });
};

export const forgotPassword = async username => {
  const body = {
    username: username,
  };
  return await API({
    method: 'POST',
    url: 'api/forgot_password',
    data: body,
  }).then(res => {
    return res;
  });
};

export const resetPassword = async (otp, password) => {
  const body = {
    otp: otp,
    password: password,
  };
  return await API({
    method: 'POST',
    url: 'api/reset_password',
    data: body,
  }).then(res => {
    return res;
  });
};
