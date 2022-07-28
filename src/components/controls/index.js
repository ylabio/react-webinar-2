import React from 'react';
import {counter} from "../../utils";

function Controls({store}){
  return (
    <div className='Controls'>
      <button onClick={() => {
        const code = counter();
        store.createItem({code, title: `Новая запись ${code}`})
      }}> Добавить </button>
    </div>
  )
}

export default Controls;
