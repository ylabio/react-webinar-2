import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Translate({translate, lang}) {
  const cn = bem('Translate');

  const cb = {
    translate: useCallback((e) => {
       translate(e.target.value);
    }, []),
  }

  return (
    <div className={cn()} >
      <span>{lang.select}:&nbsp;</span>
      <select onChange={(e) => cb.translate(e)} value={lang.lang}>
        <option value="Ru" >Ru</option>
        <option value="En" >En</option>
      </select>
    </div>
  )
}

Translate.propTypes = {
  translate: propTypes.func,
  lang: propTypes.object,
}

Translate.defaultProps = {
  translate: () => {},
  lang: {},
}

export default React.memo(Translate);
