import * as action from '../actions/action';

export const GoTo = router => {
  return dispatch => {
    dispatch({
      type: action.GoTo,
      router,
    });
  };
};

export const GoHome = () => {
  return dispatch => {
    dispatch(GoTo('MainScreen'));
  };
};

export const GoIncoming = () => {
  return dispatch => {
    dispatch(GoTo('IncomingScreen'));
  };
};

export const GoOutgoing = () => {
  return dispatch => {
    dispatch(GoTo('OutgoingScreen'));
  };
};
