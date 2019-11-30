import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

// Attempt a login using the Facebook login dialog asking for default permissions.
export const loginFacebook = () => {
  LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then(result => {
      if (result.isCancelled) {
        return Promise.reject(new Error('User canceled login'));
      } else {
        console.log(result.grantedPermissions.toString());
        return AccessToken.getCurrentAccessToken();
      }
    })
    .then(data => {
      console.log(data);
      const provider = firebase.auth.FacebookAuthProvider(data.accessToken);
      return firebase.auth().signInWithCredential(provider);
    })
    .then(user => {
      console.log(user);
    })
    .catch(err => {
      console.log(err);
    });
};
