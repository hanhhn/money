import * as action from '../actions/action';

export const InitNavigation = navigation => {
  return {
    type: action.InitNavigation,
    navigation,
  };
};

export const GoTo = (navigation, router) => {
  return dispatch => {
    navigation.navigate(router);
    dispatch({
      type: action.GoTo,
      router,
    });
  };
};

export const GoHome = navigation => {
  return dispatch => {
    dispatch(GoTo(navigation, 'MainScreen'));
  };
};

export const GoIncoming = navigation => {
  return dispatch => {
    dispatch(GoTo(navigation, 'IncomingScreen'));
  };
};

export const GoOutcoming = navigation => {
  return dispatch => {
    dispatch(GoTo(navigation, 'OutgoingScreen'));
  };
};
