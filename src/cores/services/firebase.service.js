import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import {iosConfig, androidConfig} from '../../config';

export const initializeApp = () =>
  firebase
    .initializeApp(Platform.OS === 'ios' ? iosConfig : androidConfig)
    .then(app => console.log('initialized apps ->', firebase.apps));
