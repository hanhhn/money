import {Platform} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firebase from '@react-native-firebase/app';
import {iosConfig, androidConfig} from '../../config';

// Attempt a login using the Facebook login dialog asking for default permissions.
export const loginFacebook = () => {
  LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then(result => {
      if (result.isCancelled) {
        return Promise.reject(new Error('User canceled login'));
      } else {
        // console.log(result.grantedPermissions.toString());

        AccessToken.getCurrentAccessToken().then(data => {
          if (!firebase.apps.length) {
            firebase.initializeApp(
              Platform.OS === 'ios' ? iosConfig : androidConfig,
            );
          }

          console.log(firebase.apps);

          const credential = firebase.auth.FacebookAuthProvider.credential(
            data.accessToken,
            '4a6625c4aee450444b91e6ae59f070a9',
          );

          firebase
            .auth()
            .signInWithCredential(credential)
            .then(user => {
              console.log(user);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
