export const SignUp = (c: any) => {
  return {
    type: 'SIGNUP',
    count: c++,
  };
};


export const SingIn = (c: any) => {
  return {
    type: 'SINGIN',
    count: 0,
  };
};

export const SignOut = (c: any) => {
  return {
    type: 'SIGNOUT',
    count: c--,
  };
};
