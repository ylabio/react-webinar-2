export default function setStorage(name, data) {
  if (typeof data === "object") {
    localStorage.setItem(name, JSON.stringify(data));
    return;
  }

  localStorage.setItem(name, data);
}
