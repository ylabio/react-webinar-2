export function getUserDataFromLS() {
  return JSON.parse(localStorage.getItem('ylab'));
}