import API, { BASE_URL } from './API';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import { getToken } from '../utils/LocalStorage';

export const CategoryImage = BASE_URL + 'assets/images/ProductImage/category/';
export const ProductImage = BASE_URL + 'assets/images/ProductImage/product/';

export const checkInternetConnection = () =>
{
  NetInfo.fetch().then(state =>
  {
    if (state.isConnected === false)
    {
      Toast.showWithGravity(
        'No internet connection',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  });
};

export const userLogin = async (username, password) =>
{
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
    .then(res =>
    {
      return res;
    })
    .catch(err =>
    {
      Toast.showToast(err.message);
    });
};

export const userRegister = async (name, username, password) =>
{
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
  }).then(res =>
  {
    return res;
  });
};
export const getAllCategory = async () =>
{
  return await API({
    method: 'GET',
    url: 'api/categories',
  }).then(res =>
  {
    return res;
  });
};

export const getAllPayment = async () =>
{
  return await API({
    method: 'GET',
    url: 'api/payments',
  }).then(res =>
  {
    return res;
  });
};

export const getNewProducts = async () =>
{
  return await API({
    method: 'GET',
    url: 'api/products',
  }).then(res =>
  {
    return res;
  });
};
export const getPopularProducts = async () =>
{
  return await API({
    method: 'GET',
    url: 'api/popular_products',
  }).then(res =>
  {
    return res;
  });
};

export const getProductList = async categoryId =>
{
  return await API({
    method: 'GET',
    url: `api/products?categories=${categoryId}`,
  }).then(res =>
  {
    return res;
  });
};

export const updateUser = async user =>
{
  return await API({
    method: 'PUT',
    url: `api/user/${user.user_id}`,
    data: user,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }).then(res =>
  {
    return res;
  });
};
export const searchProduct = async text =>
{
  return await API({
    method: 'GET',
    url: `api/products?name=${text}`,
  }).then(res =>
  {
    return res;
  });
};

export const searchProductCategory = async (text, category_id) =>
{
  return await API({
    method: 'GET',
    url: `api/products?name=${text}&categories=${category_id}`,
  }).then(res =>
  {
    return res;
  });
};

export const orderPlace = async orderDetails =>
{
  return await API({
    method: 'POST',
    url: 'api/orders',
    data: orderDetails,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }).then(res =>
  {
    return res;
  });
};

export const getOrder = async id =>
{
  return await API({
    method: 'GET',
    url: `api/orders/${id}`,
  }).then(res =>
  {
    return res;
  });
};

export const getOrderDetails = async id =>
{
  return await API({
    method: 'GET',
    url: `api/order_detail/${id}`,
  }).then(res =>
  {
    return res;
  });
};
