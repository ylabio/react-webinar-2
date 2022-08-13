import React, {useCallback} from 'react';
import propTypes, {number} from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Translate({translateRu, translateEn, lang}) {
  const cn = bem('Translate');

  const cb = {
    translate: useCallback((e) => {
      e.target.value === 'Ru' && translateRu();
      e.target.value === 'En' && translateEn();
    }, []),
    translateEn: useCallback((item) => {

    }, [])
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
  translateRu: propTypes.func.isRequired,
  translateEn: propTypes.func.isRequired,
  lang: propTypes.object,
}

Translate.defaultProps = {
  lang: {},
}

export default React.memo(Translate);
