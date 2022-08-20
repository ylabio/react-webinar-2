export function saveTokenToCookie(
  token,
  username,
) {
  const data = `${username}=${token}`;
  document.cookie = data;
}
