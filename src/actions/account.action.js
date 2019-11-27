export const SignUp = c => {
  return {
    type: 'SIGNUP',
    count: c++,
  };
};

export const SingIn = c => {
  return {
    type: 'SINGIN',
    count: 0,
  };
};

export const SignOut = c => {
  return {
    type: 'SIGNOUT',
    count: c--,
  };
};
