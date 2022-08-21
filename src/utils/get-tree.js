export default function getTree(data, id) {
  const
    t = {},
    parents = new Set,
    children = new Set;
  data.forEach(o => {
    children.add(o[id]);
    if (o.parent) {
      parents.add(o.parent["_id"]);
      ((t[o.parent["_id"]] ??= { [id]: o.parent["_id"] }).children ??= []).push(Object.assign(t[o[id]] ??= {}, o))
    }
  });
  children.forEach(Set.prototype.delete, parents);
  return [...parents].map(id => t[id]);
}