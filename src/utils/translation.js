import locate from "./locate";
export default function translation(lng, name) {
  return locate[lng][name];
}
