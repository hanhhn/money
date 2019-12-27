import {Alert} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {initializeFirebase} from '../cores/services/firebase.service';
import {_setStoreData} from '../cores/services/storage.service';
import {USER_DATE, ACCESS_TOKEN, EMAIL} from '../constants';
import * as action from '../actions/action';

export const SignedInSuccess = (isLogged, accessToken, email) => {
  return {
    type: action.SignedInSuccess,
    isLogged,
    accessToken,
    email,
  };
};

export const SignedInFaild = () => {
  return {
    type: action.SignedInSuccess,
  };
};

export const SignIn = func => {
  return dispatch => {
    if (func === 'facebook') {
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
                .then(userCredential => {
                  _setStoreData(USER_DATE, userCredential.user);
                  _setStoreData(EMAIL, userCredential.user.email);

                  dispatch(
                    SignedInSuccess(
                      true,
                      data.accessToken,
                      userCredential.user.email,
                    ),
                  );
                })
                .catch(() => {
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
        dispatch(SignedInSuccess(true, accessToken, user.email));
      } else {
        dispatch(SignedInFaild());
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
        dispatch({
          type: action.SignOut,
        });
      });
  };
};
