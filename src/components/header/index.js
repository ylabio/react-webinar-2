import React, { useCallback } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Header(props){
    const { text, onChangeLng } = props
    const cn = bem('Header')

    const callbacks = {
        changeLng: useCallback((e) => onChangeLng(e.target.value), [])
    }

    return (
      <>
      <h1>{text}</h1>
      <select onChange={callbacks.changeLng}>
        <option value="Ru">Русский</option>
        <option value="En">English</option>
      </select>
      </>
    )
}

export default React.memo(Header);