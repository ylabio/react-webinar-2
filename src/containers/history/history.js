import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

function History({children}) {

  const store = useStore();

  console.log(window.location)

  useInit(async () => {
    await store.get('history').addToHistory();
  }, [], {backForward: true});

  console.log(window.location)

  return children;
}

export default History;


