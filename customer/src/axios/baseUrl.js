import { Platform } from 'react-native'


let baseURL = '';

{
    Platform.OS == 'android'
        ? baseURL = 'https://trunghanh.azurewebsites.net/'
        : baseURL = 'https://trunghanh.azurewebsites.net/'
}

export default baseURL;
