export const SignInFacebook = c => {
  return {
    type: 'SIGNIN-FACEBOOK',
    count: 0,
  };
};

export const SignInGoogle = c => {
  return {
    type: 'SIGNIN-GOOGLE',
    count: 0,
  };
};

export const SignInFailed = c => {
  return {
    type: 'SIGNIN-FAILED',
    count: 0,
  };
};

export const SignUp = c => {
  return {
    type: 'SIGNUP',
    count: c++,
  };
};

export const SignOut = c => {
  return {
    type: 'SIGNOUT',
    count: c--,
  };
};
