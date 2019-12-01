import {AsyncStorage} from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    Alert.alert('Error !^^', 'Xảy ra lỗi trong quá trình đồng bộ dữ liệu.');
  }
};

export const _retrieveData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    Alert.alert('Error !^^', 'Xảy ra lỗi trong quá trình đồng bộ dữ liệu.');
  }
};
