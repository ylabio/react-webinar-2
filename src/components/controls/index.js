import React from 'react';
import {counter} from "../../utils";
import './style.css';

function Controls({onAdd}){
  return (
    <div className='Controls'>
      <button onClick={onAdd}> Добавить </button>
    </div>
  )
}

export default Controls;
