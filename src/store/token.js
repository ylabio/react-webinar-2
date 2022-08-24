const tokenName = 'shop-token';

export const getToken = () => {
  const token = localStorage.getItem(tokenName);
  return token ?? '';
};

export const saveToken = (token) => {
  localStorage.setItem(tokenName, token);
};

export const dropToken = () => {
  localStorage.removeItem(tokenName);
};
