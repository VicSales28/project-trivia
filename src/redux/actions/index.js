export const scorePlayer = (score) => ({ type: 'SET_SCORE', score });

export const assertionPlayer = (hit) => ({ type: 'SET_ASSERTION', hit });

export const saveProfileGlobal = (name, email) => ({ type: 'SAVE_PROFILE', name, email });

export const resetProfile = () => ({ type: 'RESET_PROFILE' });
