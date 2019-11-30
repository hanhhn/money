import {loginFacebook} from '../cores/services/auth.service';

const accountReducer = (state = [], action) => {
  switch (action.type) {
    case 'SIGNIN-FACEBOOK':
      loginFacebook();
      return state;
    case 'SIGNIN-GOOGLE':
      return state;
    case 'SIGNIN-FAILED':
      return state;
    case 'SIGNUP':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case 'SIGNOUT':
      return state;

    default:
      return state;
  }
};

export default accountReducer;
