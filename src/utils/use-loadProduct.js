import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function useLoadProduct(store) {
  const { id } = useParams();

  useEffect(() => {
    store.get("catalog").loadProduct(id);
  }, [id]);

  return [id];
}
