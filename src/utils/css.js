const css = (...str) => {
  return str.filter((i) => typeof i === 'string').join(' ');
};

export default css;
