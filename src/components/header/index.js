import React, { useCallback, useState } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Context from '../../store/textcontext';

function Header(props){
    const { onChangeLng } = props
    const { HEADER } =  React.useContext(Context)

    const cn = bem('Header')
    const [ lng, setLng ] = useState('Ru')
    const callbacks = {
        changeLng: useCallback((e) => {
          const lng = e.target.value
          setLng(lng)
          onChangeLng(lng)
        }, [])
    }

    return (
      <>
      <h1>{HEADER}</h1>
      <select className={cn('lng-select')} defaultValue={lng} onChange={callbacks.changeLng}>
        <option value="Ru">Русский</option>
        <option value="En">English</option>
      </select>
      </>
    )
}

export default React.memo(Header);