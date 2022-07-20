import AsyncStorage from '@react-native-community/async-storage';

const API_KEY = 'api_key';
const USER_DETAILS = 'user_details';
const USER_LOCATION = 'user_location';
const CART = 'cart';
const PRODUCT_ITEM = 'product_item';
const IMAGE = 'image';
const NOTE = 'note';
const DESCRIPTION = 'description';

export const getApiKey = async () => {
  try {
    let apiKey = await AsyncStorage.getItem(API_KEY);
    return apiKey;
  } catch (error) {
    console.log('Error fetching High Scores', error);
    return null;
  }
};

export const setApiKey = api => {
  AsyncStorage.setItem(API_KEY, api);
};

export const getToken = async () => {
  try {
    let userDetails = await AsyncStorage.getItem(USER_DETAILS);
    userDetails = JSON.parse(userDetails);
    return userDetails.token;
  } catch (error) {
    console.log('Error fetching High Scores', error);
    return null;
  }
};

export const getUserDetails = async () => {
  try {
    let userDetails = await AsyncStorage.getItem(USER_DETAILS);
    userDetails = JSON.parse(userDetails);
    return userDetails;
  } catch (error) {
    console.log('Error fetching High Scores', error);
    return null;
  }
};

export const setUserDetails = user => {
  AsyncStorage.setItem(USER_DETAILS, JSON.stringify(user));
};

export const getUserLocation = async () => {
  try {
    let userLocation = await AsyncStorage.getItem(USER_LOCATION);
    userLocation = JSON.parse(userLocation);
    return userLocation;
  } catch (error) {
    console.log('Error fetching High Scores', error);
    return null;
  }
};

export const setUserLocation = coordinates => {
  AsyncStorage.setItem(USER_LOCATION, JSON.stringify(coordinates));
};

export const getCart = async () => {
  try {
    let cartDetails = await AsyncStorage.getItem(CART);
    cartDetails = JSON.parse(cartDetails);
    return cartDetails;
  } catch (error) {
    console.log('Error fetching High Scores', error);
    return null;
  }
};

export const setCart = cart => {
  AsyncStorage.setItem(CART, JSON.stringify(cart));
};

export const getProductItem = async () => {
  try {
    let productDetails = await AsyncStorage.getItem(PRODUCT_ITEM);
    productDetails = JSON.parse(productDetails);
    return productDetails;
  } catch (error) {
    console.log('Error fetching High Scores', error);
    return null;
  }
};

export const setProductItem = productItem => {
  AsyncStorage.setItem(PRODUCT_ITEM, JSON.stringify(productItem));
};

export const getImageItem = async () => {
  try {
    let localImage = await AsyncStorage.getItem(IMAGE);
    localImage = JSON.parse(localImage);
    return localImage;
  } catch (error) {
    console.log('Error fetching High Scores', error);
    return null;
  }
};

export const setImageItem = image => {
  AsyncStorage.setItem(IMAGE, JSON.stringify(image));
};

export const getNoteItem = async () => {
  try {
    let note = await AsyncStorage.getItem(NOTE);
    note = JSON.parse(note);
    return note;
  } catch (error) {
    console.log('Error fetching High Scores', error);
    return null;
  }
};

export const setNoteItem = note => {
  AsyncStorage.setItem(NOTE, JSON.stringify(note));
};

export const getNoteDescriptionItem = async () => {
  try {
    let note = await AsyncStorage.getItem(DESCRIPTION);
    note = JSON.parse(note);
    return note;
  } catch (error) {
    console.log('Error fetching High Scores', error);
    return null;
  }
};

export const setNoteDescriptionItem = note => {
  AsyncStorage.setItem(DESCRIPTION, JSON.stringify(note));
};

export const logout = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};
