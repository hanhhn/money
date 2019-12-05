import {SignIn, SignedIn, SignOut} from '../actions/action';

const authReducer = (
  state = {
    isLogged: false,
    accessToken: null,
  },
  action,
) => {
  switch (action.type) {
    case SignIn:
      return {
        ...state,
        accessToken: action.accessToken,
      };

    case SignedIn:
      return {
        ...state,
        isLogged: action.isLogged,
        accessToken: action.accessToken,
      };

    case SignOut:
      return {
        ...state,
        isLogged: false,
        accessToken: null,
      };

    default:
      return state;
  }
};

export default authReducer;
