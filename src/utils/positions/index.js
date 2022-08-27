export default function positions(item, array, id) {
  console.log("array", item);
  let position = 1;

  if (item.parent._type === "comment") {
    function rec(array, item) {
      position++;
      let newArray = array.filter((i) => i._id === item.parent._id)[0];
      //   console.log("newArray", newArray);
      //   console.log("id", id);
      if (newArray && newArray.parent._id != id) {
        rec(array, newArray);
      } else {
        return;
      }
    }

    rec(array, item);
  }
  return position;
}
