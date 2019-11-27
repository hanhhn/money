const accountReducer = (state = [], action) => {
  switch (action.type) {
    case 'SINGUP':
      [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
      break;
    case 'SINGIN':
      break;
    case 'SIGNOUT':
      break;
    default:
      return state;
  }
};

export default accountReducer;
