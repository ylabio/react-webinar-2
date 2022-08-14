import { useState, useEffect } from "react";

export default function usePageState(store) {
  const [page, setPage] = useState(store.get("catalog").getState().skip);

  useEffect(() => {
    store.get("catalog").load(page);
  }, [page]);

  return [page, setPage];
}
