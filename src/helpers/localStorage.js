export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const saveProfile = (name, score, picture) => {
  const ranking = { name, score, picture };
  localStorage.setItem('ranking', JSON.stringify(ranking));
};
