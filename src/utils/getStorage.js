export default function getStorage(name) {
  if (name === "token") return localStorage.getItem(name);

  return JSON.parse(localStorage.getItem(name));
}
