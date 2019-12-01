import {Platform, Alert} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {initializeFirebase} from './firebase.service';
import {_setStoreData} from './storage.service';
import {USER_DATE, ACCESS_TOKEN} from '../../constants';

// Attempt a login using the Facebook login dialog asking for default permissions.
export const loginFacebook = () => {
  LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then(result => {
      if (result.isCancelled) {
        Alert.alert('Thông báo !^^', 'Đăng nhập để sử dụng ứng dụng.');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          initializeFirebase();

          _setStoreData(ACCESS_TOKEN, data.accessToken);
          const credential = firebase.auth.FacebookAuthProvider.credential(
            data.accessToken,
          );

          auth()
            .signInWithCredential(credential)
            .then(user => {
              _setStoreData(USER_DATE, user);
            })
            .catch(() => {
              Alert.alert('Error !^^', 'Xảy ra lỗi trong quá trình đăng nhập.');
            });
        });
      }
    })
    .catch(() => {
      Alert.alert('Error !^^', 'Xảy ra lỗi trong quá trình đăng nhập.');
    });
};

export const userSignedIn = resolve => {
  initializeFirebase();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      resolve(true);
    }
    resolve(false);
  });
};
