const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_SCORE':
    return {
      ...state,
      score: state.score + action.score,
    };
  case 'SET_ASSERTION':
    return {
      ...state,
      assertions: state.assertions + action.hit,
    };
  default:
    return state;
  }
};

export default playerReducer;
