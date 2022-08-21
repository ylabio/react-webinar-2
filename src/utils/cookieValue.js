const cookieValue = (key) => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${key}=`))
    ?.split('=')[1];
}

export default cookieValue;
