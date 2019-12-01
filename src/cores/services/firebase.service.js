import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import {iosConfig, androidConfig} from '../../config';

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(Platform.OS === 'ios' ? iosConfig : androidConfig);
  }
};
