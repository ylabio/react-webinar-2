const AUTH_TOKEN_KEY_NAME = 'shop-token';

const getToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

const saveToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export { getToken, saveToken, removeToken }
