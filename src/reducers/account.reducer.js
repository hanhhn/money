import {loginFacebook, userSignedIn} from '../cores/services/auth.service';

const accountReducer = (state = {isSignedIn: false}, action) => {
  switch (action.type) {
    case 'SIGNIN-FACEBOOK':
      loginFacebook();

      return {
        ...state,
        isSignedIn: userSignedIn(),
      };
    case 'SIGNIN-GOOGLE':
      return state;

    case 'SIGNIN-CHECK':
      let isSignedIn = false;

      userSignedIn(data => {
        isSignedIn = data;
      });

      return {
        ...state,
        isSignedIn: isSignedIn,
      };
    case 'SIGNOUT':
      return state;
    default:
      return state;
  }
};

export default accountReducer;
