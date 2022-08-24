export const getLocation = () => {
  const loco = window.location.href;
  const after = loco.slice(loco.indexOf('page=')).replace(/page=[0-9]+/, '');
  const href = `?page=:page${after}`;
  return href;
};
