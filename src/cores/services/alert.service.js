import {Alert} from 'react-native';

export const alertError = msg => {
  Alert.alert('Xảy ra lỗi', msg);
};
