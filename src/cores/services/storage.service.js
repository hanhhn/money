import AsyncStorage from '@react-native-community/async-storage';

export const _setStoreData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const _getStoreData = async key => {
  try {
    return JSON.parse(await AsyncStorage.getItem(key));
  } catch (error) {
    console.log(error);
  }
};
