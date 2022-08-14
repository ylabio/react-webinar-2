import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';

function TextField({ limit, count, onChange }) {
  const cn = bem('TextField');

  const callbacks = {
    onChange: useCallback((e) => onChange(e.target.value), [onChange])
  };

  return (
    <>
      {count ? (
        <label className={cn()}> Ограничение количества
          <input 
            className={cn('number')} 
            type="number" 
            min={1} 
            max={count} 
            value={limit} 
            onChange={callbacks.onChange}
          />
        </label>
      ) :
      null
      }
    </>
  );
};

TextField.propTypes = {
  count: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired
}

TextField.defaultProps = {
}

export default React.memo(TextField);
