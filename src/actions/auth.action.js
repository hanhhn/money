import {Alert} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {initializeFirebase} from '../cores/services/firebase.service';
import {_setStoreData} from '../cores/services/storage.service';
import {USER_DATE, ACCESS_TOKEN} from '../constants';
import * as action from '../actions/action';

export const SignedIn = (isLogged, accessToken) => {
  return {
    type: action.SignedIn,
    isLogged,
    accessToken,
  };
};

export const SignIn = func => {
  return dispatch => {
    if (func === 'facebook') {
      LoginManager.logInWithPermissions(['public_profile', 'email'])
        .then(result => {
          if (result.isCancelled) {
            Alert.alert('Thông báo !^^', 'Đăng nhập để sử dụng ứng dụng.');
            dispatch(SignedIn(false));
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
                  dispatch(SignedIn(true, data.accessToken));
                })
                .catch(() => {
                  dispatch(SignedIn(false, null));
                  Alert.alert(
                    'Error !^^',
                    'Xảy ra lỗi trong quá trình đăng nhập.',
                  );
                });
            });
          }
        })
        .catch(() => {
          Alert.alert('Error !^^', 'Xảy ra lỗi trong quá trình đăng nhập.');
        });
    }

    if (func === 'google') {
    }
  };
};

export const UserSignedIn = accessToken => {
  return dispatch => {
    initializeFirebase();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(SignedIn(true, accessToken));
      } else {
        dispatch(SignedIn(false, null));
      }
    });
  };
};

export const SignOut = () => {
  return dispatch => {
    initializeFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        _setStoreData(ACCESS_TOKEN, null);
        dispatch(SignedIn(false, null));
      });
  };
};
