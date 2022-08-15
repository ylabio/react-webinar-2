import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import titleLang from "../../utils/titleLang";
import './style.css';

function TextField({ lang, limit, count, onChange }) {
  const cn = bem('TextField');

  const callbacks = {
    onChange: useCallback((e) => onChange(e.target.value), [onChange])
  };

  return (
    <label className={cn()}> {titleLang(lang, 'limitedQuantitie')}
      <input 
        className={cn('number')} 
        type="number" 
        min={1} 
        max={count} 
        value={limit} 
        onChange={callbacks.onChange}
      />
    </label>
  );
};

TextField.propTypes = {
  lang: propTypes.string.isRequired,
  count: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired
}

TextField.defaultProps = {
}

export default React.memo(TextField);
