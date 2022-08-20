export default function getCookies() {
  const cookieArray = document.cookie.split(';');
  const cookie = {};
  cookieArray.forEach((item) => {
    if (item.search(/token=/) !== -1) {
      cookie.token = item.replace(/token=/, '');
    }
  });
  return cookie;
}
