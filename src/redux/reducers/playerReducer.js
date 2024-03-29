const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_SCORE':
    return {
      ...state,
      score: state.score + Number(action.score),
    };
  case 'SET_ASSERTION':
    return {
      ...state,
      assertions: Number(state.assertions) + Number(action.hit),
    };
  case 'SAVE_PROFILE':
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case 'RESET_PROFILE':
    return {
      name: '',
      assertions: '',
      score: 0,
      gravatarEmail: '',
    };
  default:
    return state;
  }
};

export default playerReducer;
