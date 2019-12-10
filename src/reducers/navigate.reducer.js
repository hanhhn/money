import * as act from '../actions/action';

const navigateReducer = (
  state = {
    navigation: {},
    router: 'MainScreen',
  },
  action,
) => {
  switch (action.type) {
    case act.InitNavigation:
      return {
        ...state,
        navigation: action.navigation,
        router: 'MainScreen',
      };

    case act.GoTo:
      return {
        ...state,
        router: action.router,
      };

    default:
      return state;
  }
};

export default navigateReducer;
