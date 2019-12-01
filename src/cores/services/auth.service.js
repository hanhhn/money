import {Platform, Alert} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {iosConfig, androidConfig} from '../../config';
import {_storeData} from './storage.service';
import {USER_DATE, ACCESS_TOKEN} from '../../constants';

// Attempt a login using the Facebook login dialog asking for default permissions.
export const loginFacebook = () => {
  LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then(result => {
      if (result.isCancelled) {
        return Promise.reject(new Error('User canceled login'));
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          if (!firebase.apps.length) {
            firebase.initializeApp(
              Platform.OS === 'ios' ? iosConfig : androidConfig,
            );
          }

          _storeData(ACCESS_TOKEN, data.accessToken);
          const credential = firebase.auth.FacebookAuthProvider.credential(
            data.accessToken,
          );

          auth()
            .signInWithCredential(credential)
            .then(user => {
              _storeData(USER_DATE, user);
              Alert.alert('Success !^^', 'Đăng nhập thành công.');
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
