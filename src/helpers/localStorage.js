export const saveToken = (token) => {
  console.log(token);
  localStorage.setItem('token', JSON.stringify(token));
};

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return token;
};

export const saveProfile = (name, score, picture) => {
  const ranking = { name, score, picture };
  localStorage.setItem('ranking', JSON.stringify(ranking));
};
