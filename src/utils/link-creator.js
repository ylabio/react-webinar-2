export default function linkCreator(num) {
  const reg = /(?<=page=)\d+(?=&limit)/g;
  const url = window.location.search;

  return `${url.replace(reg, num)}`;
}
