import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function useLoadProduct(store) {
  const id = useLocation().hash.slice(1);

  useEffect(() => {
    store.get("catalog").loadProduct(id);
  }, [id]);

  return [id];
}
